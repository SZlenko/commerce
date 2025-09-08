import React, { useState } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { useToast } from "../../hooks/useToast";

const Contact = () => {
  const { showSuccess, showError } = useToast();

  const [clientName, setclientName] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ========== Error Messages Start here ============
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errMessages, setErrMessages] = useState("");
  // ========== Error Messages End here ==============

  const handleName = (e) => {
    setclientName(e.target.value);
    setErrClientName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handleMessages = (e) => {
    setMessages(e.target.value);
    setErrMessages("");
  };

  // ================= Email Validation start here =============
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };
  // ================= Email Validation End here ===============

  const handlePost = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrClientName("");
    setErrEmail("");
    setErrMessages("");
    
    let hasErrors = false;
    
    if (!clientName.trim()) {
      setErrClientName("Please enter your full name");
      hasErrors = true;
    } else if (clientName.trim().length < 2) {
      setErrClientName("Name must be at least 2 characters long");
      hasErrors = true;
    }
    
    if (!email.trim()) {
      setErrEmail("Please enter your email address");
      hasErrors = true;
    } else if (!EmailValidation(email)) {
      setErrEmail("Please enter a valid email address (e.g., user@example.com)");
      hasErrors = true;
    }
    
    if (!messages.trim()) {
      setErrMessages("Please enter your message");
      hasErrors = true;
    } else if (messages.trim().length < 10) {
      setErrMessages("Message must be at least 10 characters long");
      hasErrors = true;
    }
    
    if (!hasErrors) {
      setIsSubmitting(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        showSuccess(
          `Thank you ${clientName}! Your message has been received successfully. We'll get back to you at ${email} within 24 hours.`,
          { duration: 8000 }
        );
        
        // Clear form
        setclientName("");
        setEmail("");
        setMessages("");
      } catch (error) {
        showError("Failed to send your message. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Contact" />
      <form className="pb-20">
          <h1 className="font-titleFont font-semibold text-3xl">
            Fill up a Form
          </h1>
          <div className="w-[500px] h-auto py-6 flex flex-col gap-6">
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Name
              </p>
              <input
                onChange={handleName}
                value={clientName}
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                type="text"
                placeholder="Enter your name here"
              />
              {errClientName && (
                <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                  <span className="text-sm italic font-bold">!</span>
                  {errClientName}
                </p>
              )}
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Email
              </p>
              <input
                onChange={handleEmail}
                value={email}
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                type="email"
                placeholder="Enter your name here"
              />
              {errEmail && (
                <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                  <span className="text-sm italic font-bold">!</span>
                  {errEmail}
                </p>
              )}
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Messages
              </p>
              <textarea
                onChange={handleMessages}
                value={messages}
                cols="30"
                rows="3"
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor resize-none"
                type="text"
                placeholder="Enter your name here"
              ></textarea>
              {errMessages && (
                <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                  <span className="text-sm italic font-bold">!</span>
                  {errMessages}
                </p>
              )}
            </div>
            <button
              onClick={handlePost}
              disabled={isSubmitting}
              className={`w-44 h-10 font-titleFont text-base tracking-wide font-semibold duration-200 ${
                isSubmitting
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-primeColor text-gray-200 hover:bg-black hover:text-white'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
    </div>
  );
};

export default Contact;
