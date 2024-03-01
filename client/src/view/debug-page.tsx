import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/auth-context";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function DebugPage() {
  const authContext = useContext(AuthContext);
  const [image, setImage] = useState(null);

  useEffect(() => {
    init();
  }, []);

  function init() {
    authContext?.load();
  }

  function fileOnChange(e: any) {
    const url = `https://api.cloudinary.com/v1_1/dnyzkgi84/upload`;
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("upload_preset", "ml_default");
    formData.append("tags", "picture");
    formData.append("file", file);

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then(async (result) => {
        const data = await result.json();
        setImage(data.secure_url);

        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="min-h-screen flex flex-col gap-4 justify-center items-center">
      <div className="w-[80%] bg-gray-200 rounded">
        {(() => {
          if (image) {
            return (
              <LazyLoadImage
                src={image}
                className="w-full h-full object-cover"
              />
            );
          }
        })()}
      </div>
      <input
        type="file"
        name="image"
        className="bg-gray-100 max-w-72"
        onChange={fileOnChange}
      />
    </div>
  );
}
