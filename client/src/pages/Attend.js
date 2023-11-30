import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "../axiosConfig";
import Modal from "../components/Modal";
import SendInquiry from "../components/modal-components/SendInquiry";
const Attend = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/events/get-all");
        const sortedEvents = response.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        setEvents(sortedEvents);
        console.log("Events fetched successfully!");
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchEvents();
  }, []);

  const handleSendInquiry = () => {
    setModalContent(
      <SendInquiry events={events} onClose={() => setModalOpen(false)} />
    );
    setModalOpen(true);
  };
  return (
    <div>
      <Layout>
        <button type="button" onClick={handleSendInquiry}>
          Want to attend?{" "}
        </button>
        <Modal isVisible={isModalOpen} onClose={() => setModalOpen(false)}>
          <div>{modalContent}</div>
        </Modal>
      </Layout>
    </div>
  );
};

export default Attend;
