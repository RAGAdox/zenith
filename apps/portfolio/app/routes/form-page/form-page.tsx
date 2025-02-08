import { useEffect, useState } from "react";
import { SongComponent } from "../../components/SongComponent";

const FormPage = () => {
  const [eventData, setEventData] = useState<any>();

  const host = import.meta.env.VITE_HOST_API;
  const protocol = import.meta.env.VITE_HOST_API_PROTOCOL || "https";
  const functionUrl = `${protocol}://${host}/sse`;

  useEffect(() => {
    const es = new EventSource(functionUrl);
    es.onmessage = (event) => {
      console.log(event.data);
      // setEventData(JSON.parse(event.data));
      const data = JSON.parse(event.data);
      if (!data.error) {
        setEventData(data);
      }
    };

    es.onerror = (event) => {
      es.close();
    };

    return () => {
      es.close();
    };
  }, []);

  return (
    <>
      <div>
        <h1>Streaming</h1>
        {eventData && <SongComponent spotifyTrackDetails={eventData} />}
      </div>
    </>
  );
};

export default FormPage;
