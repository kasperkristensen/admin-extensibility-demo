import { WidgetConfig } from "@medusajs/admin";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const WelcomeWidget = () => {
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    const currentHour = new Date().getHours();
    let message = "";

    if (currentHour >= 5 && currentHour < 12) {
      message = "Good Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      message = "Good Afternoon";
    } else {
      message = "Good Evening";
    }

    setGreeting(message);
  }, []);

  return (
    <div className="py-6 px-8 bg-white border border-gray-200 rounded-lg mb-2 flex justify-between items-center">
      <div className="flex flex-col gap-y-1">
        <h1 className="inter-large-semibold">{greeting}</h1>
        <p className="inter-small-regular">
          This is a Widget, get started by editing{" "}
          <span className="p-1 bg-gray-100 rounded-md border border-gray-200">
            src/admin/widgets/welcome-widget.tsx
          </span>
          .
        </p>
      </div>
      <div>
        <Link to={"/a/extensions"}>
          <button className="btn btn-small btn-secondary">Learn more</button>
        </Link>
      </div>
    </div>
  );
};

export const config: WidgetConfig = {
  zone: "order.list.before",
};

export default WelcomeWidget;
