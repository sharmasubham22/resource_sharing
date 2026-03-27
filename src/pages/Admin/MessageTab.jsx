import React, { useEffect, useState } from 'react'
import { useFirebase } from '../../context/Firebase';
import Swal from 'sweetalert2';
import MessageModal from '../../components/MessageModal';

export default function MessageTab() {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const firebase = useFirebase();

    const fetchMessages = async () => {
          try {
            const messages = await firebase.getMessages();
            setMessages(messages);
          } catch (err) {
            console.error("Failed to fetch message data:", err);
            setMessages([]);
          }
        };
    
        useEffect(() => {
          fetchMessages();
        }, [firebase])

    const handleDeleteMessage = async (id) => {
            const result = await Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#6d466b",
                            cancelButtonColor: "#cbd5e1",
                            confirmButtonText: "Yes, delete it!",
                          });
            
                    if (!result.isConfirmed) return;
          const deleteResult = await firebase.deleteMessage(id);
          if (deleteResult.success) {
                    setMessages((prev) => prev.filter((m) => m.id !== id));
                    Swal.fire({
                      title: "Deleted!",
                      text: "The message has been deleted.",
                      icon: "success",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  } else {
                    console.error("Failed to delete message:", deleteResult.error);
                    Swal.fire({
                      title: "Error",
                      text: "Could not delete the message. Please try again.",
                      icon: "error",
                    });
                  }
                }

  return (
    <div>
      <div className="relative overflow-x-auto bg-background shadow-xs rounded-base border border-border ">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-card border-b border-t border-border">
            <tr>
              <th scope="col" className="px-6 py-3 font-body">
                Message
              </th>
              <th scope="col" className="px-6 py-3 font-body">
                Sent by
              </th>
              <th scope="col" className="px-6 py-3 font-body">
                Sent on
              </th>
              <th scope="col" className="px-6 py-3 font-body">
                Status
              </th>
              <th scope="col" className="px-6 py-3 font-body">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {messages.map((messageData) => (
              <tr
                key={messageData.id}
                className="bg-background border-b border-border hover:bg-card"
              >
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-heading whitespace-nowrap"
                >
                  <p className="text-text-primary">
                    <span
                      className="text-lg font-body"
                      dangerouslySetInnerHTML={{
                        __html:
                          typeof messageData.message === "string"
                            ? messageData.message
                                .replace(/<[^>]+>/g, " ")
                                .replace(/\s+/g, " ")
                                .trim()
                                .slice(0, 50) + "..."
                            : "",
                      }}
                    />
                  </p>
                </th>
                <td className="px-6 py-4">{messageData.userName}</td>

                {messageData?.createdAt?.toDate().toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}

                <td className="px-6 py-4">{messageData.status}</td>
                <td className="px-6 py-4 space-x-3">
                  <button
                    type="button"
                    className="font-medium text-brand hover:underline cursor-pointer"
                    onClick={() => setSelectedMessage(messageData)}
                    data-modal-target="crud-modal"
                    data-modal-toggle="crud-modal"
                  >
                    Update
                  </button>
                  {selectedMessage && (
                    <MessageModal
                      message={selectedMessage}
                      onClose={() => setSelectedMessage(null)}
                      onSave={fetchMessages}
                    />
                  )}
                  <button
                    type="button"
                    className="font-medium text-danger hover:underline cursor-pointer"
                    onClick={() => handleDeleteMessage(messageData.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
