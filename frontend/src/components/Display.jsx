import { useState, useEffect } from "react";

export default function Display({ data }) {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    let mydata = JSON.parse(data.data);
    setJsonData(mydata);
  }, [data]);

  return (
    <div className="display-container">
      {jsonData && (
        <div className="display-content">
          <p className="rating">
            <span className="titles">Score:</span> {jsonData.score}
          </p>
          <p className="rating">
            <span className="titles">Missing:</span> {jsonData.missing}
          </p>
          <p className="rating">
            <span className="titles">Add:</span> {jsonData.add}
          </p>
          <p className="rating">
            <span className="titles">Updated Resume:</span>{" "}
            {jsonData.updatedResume}
          </p>
          {jsonData.score >= 8 && (
            <a
              href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                jsonData.updatedResume
              )}`}
              download="updated_resume.txt"
              className="download-link"
            >
              Download Updated Resume
            </a>
          )}
        </div>
      )}
    </div>
  );
}
