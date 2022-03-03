const Breadcrumb = (props) => {
  const message = props.message;
  return (
    // <div className="bg-stone-800 text-white px-4 py-2 mb-4 rounded-lg absolute bottom-0 left-12">
    //   <p className="font-bold">{message}</p>
    // </div>
    <span>{message}</span>
  );
};

export default Breadcrumb;
