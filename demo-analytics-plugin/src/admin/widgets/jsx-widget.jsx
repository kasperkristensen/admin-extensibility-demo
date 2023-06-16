const JSXWidget = () => {
  return (
    <div className="py-6 px-8 bg-white border border-gray-200 rounded-lg mb-2 flex justify-between items-center">
      <div className="flex flex-col gap-y-1">
        <h1 className="inter-large-semibold">JSX Support</h1>
        <p className="inter-small-regular">
          This is a Widget written in <code>.jsx</code>, and being loaded from a
          plugin. Admin Extensions support both
          <code>.jsx</code> and <code>.tsx</code> files, so whether your are
          using TypeScript for your project or not you can still customize your
          dashboard. Get started by editing{" "}
          <span className="p-1 bg-gray-100 rounded-md border border-gray-200">
            src/admin/widgets/jsx-widget.jsx
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export const config = {
  zone: "discount.list.before",
};

export default JSXWidget;
