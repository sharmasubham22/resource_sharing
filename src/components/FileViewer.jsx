import React from 'react'

export default function FileViewer({ fileUrl, fileType }) {
  
    if (!fileUrl) return null;


  switch (fileType) {
    case "document":
      return <iframe src={fileUrl} className="w-full h-125 rounded-lg" />;

    case "video":
      return <video src={fileUrl} controls className="w-full rounded-lg" />;

    case "tools":
    case "template":
    case "collectionFile":
      return (
        <a
          href={fileUrl}
          target="_blank"
          className="block p-4 bg-card rounded-lg border text-center"
        >
          Download File
        </a>
      );

    default:
      return <p>Unsupported file type</p>;
  }
}
