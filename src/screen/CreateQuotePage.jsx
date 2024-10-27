import axios from "axios";
import React, { useState } from "react";
import { useRef } from "react";

const CreateQuote = () => {
  const [quoteText, setQuoteText] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
 

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post(
        "https://crafto.app/crafto/v1.0/media/assignment/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const mediaUrl = response.data[0]?.url;
      if (!mediaUrl) {
        throw new Error("Image URL not found in response.");
      }
      return mediaUrl;
    } catch (error) {
      console.error("Upload Error Details:", error.response || error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (!image || !quoteText) {
        setError("Please provide both image and text");
        setLoading(false);
        return;
      }

      // Upload image and get the mediaUrl
      const mediaUrl = await uploadImage(image);

      const token = localStorage.getItem("accessToken");
      console.log(token);
      if (!token) {
        throw new Error("No authentication token found");
      }

      // Post the quote with the mediaUrl and text
      const response = await axios.post(
        "https://assignment.stage.crafto.app/postQuote",
        {
          text: quoteText,
          mediaUrl,
        },
        {
          headers: {
            // Authorization: `Bearer ${token}`,
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Quote creation response:", response.data);

      setQuoteText("");
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setMessage("Quote created successfully!");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to create quote"
      );
      console.error("Submission error:", error.response || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">
              Create Quote{" "}
            </h2>

            <form onSubmit={handleSubmit} className="mt-8">
              <label className="text-base text-gray-500 font-semibold mb-2 block">
                Upload file
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="w- text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
              />
              <p className="text-xs text-gray-400 mt-2">
                PNG, JPG are Allowed.
              </p>
              <div className="mt-4 flex flex-col ">
                <label className="text-gray-500 text-base  font-semibold">
                  Quote Text:
                </label>
                <textarea
                  value={quoteText}
                  onChange={(e) => setQuoteText(e.target.value)}
                  className="border mt-2 h-20"
                  required
                />
              </div>
              {message && <p className="text-green-500"> {message}</p>}
              {error && <p className="text-red-400"> {error}</p>}
              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  {loading ? "Creating..." : "Create Quote"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateQuote;
