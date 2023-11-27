import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Modal from "../components/Modal";
import SendInquiry from "../components/modal-components/SendInquiry";
import axios from "../axiosConfig";

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchEvents = async () => {
      try {
        const response = await axios.get("/events/get-all");
        const sortedEvents = response.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        if (isMounted) {
          setEvents(sortedEvents);
        }
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchEvents();

    return () => {
      isMounted = false;
    };
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
        <p>This is the home page. How do we want it to look?</p>
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

export default Home;
