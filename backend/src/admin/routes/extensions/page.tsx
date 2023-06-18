import { RouteConfig } from "@medusajs/admin";
import CodeSnippets from "../../components/code-snippets";
import InjectionZoneTable from "../../components/table";

const ExtensionsPage = () => {
  return (
    <>
      <div className="bg-white p-8 large:py-16 rounded-lg border border-gray-200 flex flex-col items-center">
        <div className="large:max-w-[70%] flex flex-col gap-y-8">
          <div>
            <h2 className="inter-xlarge-semibold mb-2">
              What is an Extension?
            </h2>
            <p className="inter-base-regular text-gray-700">
              Extensions are a way of expanding the functionality of the Medusa
              Admin dashboard. They can add new widgets or routes, providing
              developers with new ways to create custom merchant experiences.
              This document will guide you through the process of creating your
              own extensions and explains how extensions can also be shipped as
              part of plugins for Medusa.
            </p>
          </div>
          <div>
            <h2 className="inter-xlarge-semibold mb-2">Widgets</h2>
            <p>
              Widgets are small components that can be added to the dashboard to
              provide additional functionality. They can be added to any of the
              prefefined injection zones, or to multiple zones at once. Widgets
              are React components that can be written in either TypeScript or
              JavaScript. They are added to the dashboard by creating a file in
              the <code>src/admin/widgets</code> directory. The file must export
              a default component and a config object. The config object must
              contain a <code>zone</code> property, which defines the injection
              zone for the widget. The following example shows a widget that is
              rendered in the <code>product.details.before</code> zone.
            </p>
            <div className="my-4">
              <CodeSnippets
                snippets={[
                  {
                    label: ".tsx",
                    language: "tsx",
                    code: `// src/admin/widgets/my-order-widget.tsx\nimport { WidgetConfig, OrderDetailsWidgetProps } from "@medusajs/admin";\n\nconst MyOrderWidget= ({ order }: OrderDetailsWidgetProps) => {\n  return <div>Order: {order.id}</div>;\n};\n\nexport const config: WidgetConfig = {\n  zone: "order.details.before",\n};\n\nexport default MyOrderWidget;`,
                  },
                  {
                    label: ".jsx",
                    language: "jsx",
                    code: `// src/admin/widgets/my-order-widget.jsx\nconst MyOrderWidget = ({ order }) => {\n  return <div>Order: {order.id}</div>;\n};\n\nexport const config= {\n  zone: "order.details.before",\n};\n\nexport default MyOrderWidget;`,
                  },
                ]}
              />
            </div>
            <p>
              Notice that the widget component receives a <code>order</code>{" "}
              prop. This is because the widget is rendered in the{" "}
              <code>order.details.before</code> zone. All widgets rendered
              within a <code>details</code> zone will receive a prop containing
              the resource that is being viewed. In this case, the{" "}
              <code>order</code> prop contains the order that is being viewed.
              Besides the entity in question, all details widgets also receive a{" "}
              <code>notify</code> prop, which is a function that can be used to
              show notifications to the user. The <code>notify</code> function
              is passed to all types of widgets, not just details widgets. The
              following table shows the props that are passed to widgets in each
              zone.
            </p>
            <div className="my-4">
              <InjectionZoneTable />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-6" />
    </>
  );
};

export const config: RouteConfig = {
  link: {
    label: "Extensions",
  },
};

export default ExtensionsPage;
