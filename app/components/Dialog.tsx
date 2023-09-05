// import { useState } from "react";

export default function Dialog() {
  //   const [isOpen, setIsOpen] = useState(false);
  // const dialogElement = document.querySelector("dialog");
  let isOpen = false;
  const open = () => {
    isOpen = true;
    // setIsOpen(true);
    // dialogElement?.showModal();
  };

  const close = () => {
    isOpen = false;
    // setIsOpen(false);
    // dialogElement?.close();
  };
  return (
    <>
      {!isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50">
          <dialog className="bg-red-300">
            {/* <button onClick={close}>Close</button> */}
            <p>Dialog</p>
          </dialog>
        </div>
      )}
      {/* <button onClick={open}>Open Dialog</button> */}
    </>
  );
}
