import { Mail, Phone, Package } from 'lucide-react';

export default function DeliveryPolicy() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="bg-pure-black/90 py-8 text-white sm:py-10 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Delivery Policy
          </h1>
          <p className="mx-auto max-w-2xl text-base text-white md:text-lg">
            Everything you need to know about our shipping and delivery services
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto space-y-4 px-3 py-3 sm:space-y-8 sm:py-5">
        {/* Delivery Coverage */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Delivery Coverage
          </h2>
          <p className="text-dark-gray text-sm leading-relaxed md:text-base">
            Gadget Grid delivers nationwide across Bangladesh. We offer delivery
            services to all major cities including Dhaka, Chittagong, Sylhet,
            Rajshahi, Khulna, Barisal, Rangpur, and Mymensingh. For remote
            areas, additional delivery charges may apply and delivery times may
            be extended.
          </p>
          <p className="text-dark-gray mt-4 text-sm leading-relaxed md:text-base">
            International shipping is currently not available. We are working to
            expand our delivery network to serve customers worldwide in the
            future.
          </p>
        </section>

        {/* Delivery Options */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Delivery Options
          </h2>
          <div className="space-y-4">
            <div className="border-primary border-l-4 pl-4">
              <h3 className="text-foreground text-sm font-semibold md:text-base">
                Standard Delivery (3-5 Business Days)
              </h3>
              <p className="text-dark-gray text-sm leading-relaxed">
                Free delivery for orders above ৳2,000. Delivery charge of ৳60
                applies for orders below ৳2,000.
              </p>
            </div>
            <div className="border-primary border-l-4 pl-4">
              <h3 className="text-foreground text-sm font-semibold md:text-base">
                Express Delivery (1-2 Business Days)
              </h3>
              <p className="text-dark-gray text-sm leading-relaxed">
                Available in Dhaka, Chittagong, and Sylhet. Express delivery
                charge of ৳120 applies to all orders.
              </p>
            </div>
            <div className="border-primary border-l-4 pl-4">
              <h3 className="text-foreground text-sm font-semibold md:text-base">
                Same Day Delivery
              </h3>
              <p className="text-dark-gray text-sm leading-relaxed">
                Available in selected areas of Dhaka for orders placed before
                2:00 PM. Same day delivery charge of ৳200.
              </p>
            </div>
          </div>
        </section>

        {/* Order Processing */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Order Processing Time
          </h2>
          <p className="text-dark-gray text-sm leading-relaxed md:text-base">
            Orders are processed within 1-2 business days after payment
            confirmation. During peak seasons or promotional periods, processing
            time may extend to 2-3 business days. You will receive an order
            confirmation email immediately after placing your order and a
            shipping confirmation with tracking details once your order is
            dispatched.
          </p>
          <p className="text-dark-gray mt-4 text-sm leading-relaxed md:text-base">
            Orders placed on weekends or public holidays will be processed on
            the next business day. Custom or special order items may require
            additional processing time.
          </p>
        </section>

        {/* Delivery Schedule */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Delivery Schedule
          </h2>
          <p className="text-dark-gray text-sm leading-relaxed md:text-base">
            Our delivery partners operate Monday to Saturday from 9:00 AM to
            8:00 PM. Sunday deliveries are available for express and same-day
            delivery options in selected areas. We will attempt delivery up to 3
            times before returning the package to our warehouse.
          </p>
          <p className="text-dark-gray mt-4 text-sm leading-relaxed md:text-base">
            You will receive SMS and email notifications with delivery updates.
            Please ensure someone is available to receive the package during the
            estimated delivery window.
          </p>
        </section>

        {/* Delivery Charges */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Delivery Charges
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-foreground py-2 text-left font-semibold">
                    Delivery Type
                  </th>
                  <th className="text-foreground py-2 text-left font-semibold">
                    Area
                  </th>
                  <th className="text-foreground py-2 text-left font-semibold">
                    Charge
                  </th>
                  <th className="text-foreground py-2 text-left font-semibold">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="text-dark-gray">
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2">Standard</td>
                  <td className="py-2">Inside Dhaka</td>
                  <td className="py-2">৳60 (Free above ৳2,000)</td>
                  <td className="py-2">3-5 days</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2">Standard</td>
                  <td className="py-2">Outside Dhaka</td>
                  <td className="py-2">৳100 (Free above ৳2,000)</td>
                  <td className="py-2">4-6 days</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2">Express</td>
                  <td className="py-2">Major Cities</td>
                  <td className="py-2">৳120</td>
                  <td className="py-2">1-2 days</td>
                </tr>
                <tr>
                  <td className="py-2">Same Day</td>
                  <td className="py-2">Selected Dhaka Areas</td>
                  <td className="py-2">৳200</td>
                  <td className="py-2">Same day</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Package Tracking */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Package Tracking
          </h2>
          <p className="text-dark-gray text-sm leading-relaxed md:text-base">
            Once your order is shipped, you will receive a tracking number via
            SMS and email. You can track your package status on our website or
            through our delivery partner&apos;s tracking system. Real-time
            updates will be provided throughout the delivery process.
          </p>
          <p className="text-dark-gray mt-4 text-sm leading-relaxed md:text-base">
            If you face any issues with tracking or need assistance, our
            customer support team is available to help you locate your package
            and provide delivery updates.
          </p>
        </section>

        {/* Delivery Issues */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Delivery Issues & Resolution
          </h2>
          <p className="text-dark-gray text-sm leading-relaxed md:text-base">
            If your package is damaged during delivery, please refuse the
            delivery and contact us immediately. For lost or stolen packages, we
            will investigate with our delivery partner and provide a resolution
            within 7 business days. Replacement or refund will be provided based
            on the investigation results.
          </p>
          <p className="text-dark-gray mt-4 text-sm leading-relaxed md:text-base">
            For failed delivery attempts, packages will be held at the nearest
            pickup point for 7 days before being returned to our warehouse.
            Additional delivery charges may apply for re-delivery attempts.
          </p>
        </section>

        {/* Special Instructions */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Special Delivery Instructions
          </h2>
          <p className="text-dark-gray text-sm leading-relaxed md:text-base">
            You can provide special delivery instructions during checkout, such
            as preferred delivery time, alternative contact person, or specific
            delivery location within your address. However, we cannot guarantee
            that all special requests will be accommodated due to operational
            constraints.
          </p>
          <p className="text-dark-gray mt-4 text-sm leading-relaxed md:text-base">
            For high-value items, signature confirmation is required upon
            delivery. Photo ID may be requested to verify the recipient&apos;s
            identity for security purposes.
          </p>
        </section>

        {/* Contact Information */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Delivery Support
          </h2>
          <p className="text-dark-gray mb-6 text-sm leading-relaxed md:text-base">
            For any delivery-related questions or issues, please contact our
            delivery support team:
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            <div className="text-center">
              <h3 className="text-foreground mb-2 text-sm font-semibold md:text-base">
                Delivery Hotline
              </h3>
              <div className="text-primary flex items-center justify-center gap-2 text-sm md:text-base">
                <Phone className="h-4 w-4" />
                <span>(+88) 01234567891</span>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-foreground mb-2 text-sm font-semibold md:text-base">
                Email Support
              </h3>
              <div className="text-primary flex items-center justify-center gap-2 text-sm md:text-base">
                <Mail className="h-4 w-4" />
                <span>delivery@itdaily.com</span>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-foreground mb-2 text-sm font-semibold md:text-base">
                Track Package
              </h3>
              <div className="text-primary flex items-center justify-center gap-2 text-sm md:text-base">
                <Package className="h-4 w-4" />
                <span>Track Your Order</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
