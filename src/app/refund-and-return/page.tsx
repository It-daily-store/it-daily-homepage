import { Mail, Phone, RotateCcw } from 'lucide-react';

export default function RefundReturnPolicy() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="bg-pure-black/90 py-8 text-white sm:py-10 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Refund & Return Policy
          </h1>
          <p className="mx-auto max-w-2xl text-base text-white md:text-lg">
            Your satisfaction is our priority. Learn about our hassle-free
            return and refund process
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto space-y-4 px-3 py-3 sm:space-y-8 sm:py-5">
        {/* Return Eligibility */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Return Eligibility
          </h2>
          <p className="text-dark-gray text-sm leading-relaxed md:text-base">
            Items can be returned within 7 days of delivery for a full refund or
            exchange. Products must be in original condition, unused, and in
            original packaging with all accessories, manuals, and warranty cards
            included. Items showing signs of use, damage, or missing components
            may not be eligible for return.
          </p>
          <p className="text-dark-gray mt-4 text-sm leading-relaxed md:text-base">
            Certain items like software, digital products, personalized items,
            and consumables are not eligible for return unless they are
            defective or damaged upon arrival.
          </p>
        </section>

        {/* Return Process */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            How to Return Items
          </h2>
          <div className="space-y-4">
            <div className="border-primary border-l-4 pl-4">
              <h3 className="text-foreground text-sm font-semibold md:text-base">
                Step 1: Contact Us
              </h3>
              <p className="text-dark-gray text-sm leading-relaxed">
                Contact our customer service within 7 days of delivery to
                initiate a return request. Provide your order number and reason
                for return.
              </p>
            </div>
            <div className="border-primary border-l-4 pl-4">
              <h3 className="text-foreground text-sm font-semibold md:text-base">
                Step 2: Return Authorization
              </h3>
              <p className="text-dark-gray text-sm leading-relaxed">
                Once approved, you&apos;ll receive a Return Authorization Number
                (RAN) and return instructions via email.
              </p>
            </div>
            <div className="border-primary border-l-4 pl-4">
              <h3 className="text-foreground text-sm font-semibold md:text-base">
                Step 3: Package & Ship
              </h3>
              <p className="text-dark-gray text-sm leading-relaxed">
                Pack the item securely in original packaging and ship using our
                prepaid return label or arrange pickup.
              </p>
            </div>
            <div className="border-primary border-l-4 pl-4">
              <h3 className="text-foreground text-sm font-semibold md:text-base">
                Step 4: Processing
              </h3>
              <p className="text-dark-gray text-sm leading-relaxed">
                Once we receive and inspect your return, refund or exchange will
                be processed within 3-5 business days.
              </p>
            </div>
          </div>
        </section>

        {/* Refund Methods */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Refund Methods & Timeline
          </h2>
          <p className="text-dark-gray text-sm leading-relaxed md:text-base">
            Refunds will be processed using the same payment method used for the
            original purchase. Credit card refunds typically take 5-10 business
            days to appear on your statement. Mobile banking and bank transfer
            refunds are processed within 3-5 business days.
          </p>
          <p className="text-dark-gray mt-4 text-sm leading-relaxed md:text-base">
            For cash on delivery orders, refunds will be issued via bank
            transfer or mobile banking. You&apos;ll need to provide your bank
            account or mobile banking details for the refund process.
          </p>
        </section>

        {/* Exchange Policy */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Exchange Policy
          </h2>
          <p className="text-dark-gray text-sm leading-relaxed md:text-base">
            Exchanges are available for size, color, or model variations within
            7 days of delivery. The replacement item must be of equal or lesser
            value. If the replacement item costs more, you&apos;ll need to pay
            the difference. If it costs less, the difference will be refunded.
          </p>
          <p className="text-dark-gray mt-4 text-sm leading-relaxed md:text-base">
            Exchange shipping is free for defective items. For other exchanges,
            standard shipping charges apply. Exchanges are subject to stock
            availability.
          </p>
        </section>

        {/* Damaged/Defective Items */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Damaged or Defective Items
          </h2>
          <p className="text-dark-gray text-sm leading-relaxed md:text-base">
            If you receive a damaged or defective item, please contact us
            immediately with photos of the damage. We&apos;ll arrange for
            immediate replacement or full refund at no additional cost. Return
            shipping for damaged/defective items is free and will be arranged by
            our team.
          </p>
          <p className="text-dark-gray mt-4 text-sm leading-relaxed md:text-base">
            For items damaged during shipping, please refuse delivery and
            contact us immediately. We&apos;ll work with our shipping partners
            to resolve the issue and ensure you receive a replacement quickly.
          </p>
        </section>

        {/* Return Shipping */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Return Shipping
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-foreground py-2 text-left font-semibold">
                    Return Reason
                  </th>
                  <th className="text-foreground py-2 text-left font-semibold">
                    Shipping Cost
                  </th>
                  <th className="text-foreground py-2 text-left font-semibold">
                    Pickup Available
                  </th>
                </tr>
              </thead>
              <tbody className="text-dark-gray">
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2">Defective/Damaged</td>
                  <td className="py-2">Free</td>
                  <td className="py-2">Yes</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2">Wrong Item Sent</td>
                  <td className="py-2">Free</td>
                  <td className="py-2">Yes</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2">Change of Mind</td>
                  <td className="py-2">Customer Pays</td>
                  <td className="py-2">No</td>
                </tr>
                <tr>
                  <td className="py-2">Size/Color Exchange</td>
                  <td className="py-2">Customer Pays</td>
                  <td className="py-2">Optional</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Non-Returnable Items */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Non-Returnable Items
          </h2>
          <p className="text-dark-gray text-sm leading-relaxed md:text-base">
            The following items cannot be returned unless they are defective:
            Software and digital downloads, personalized or customized products,
            consumable items (batteries, cables with wear), items without
            original packaging, and products damaged by misuse.
          </p>
          <p className="text-dark-gray mt-4 text-sm leading-relaxed md:text-base">
            Gift cards, promotional items, and clearance sale items marked as
            &quot;final sale&quot; are also non-returnable. Please check product
            descriptions carefully before purchasing.
          </p>
        </section>

        {/* Contact Information */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Return Support
          </h2>
          <p className="text-dark-gray mb-6 text-sm leading-relaxed md:text-base">
            Need help with a return or refund? Our customer service team is here
            to assist you:
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            <div className="text-center">
              <h3 className="text-foreground mb-2 text-sm font-semibold md:text-base">
                Returns Hotline
              </h3>
              <div className="text-primary flex items-center justify-center gap-2 text-sm md:text-base">
                <Phone className="h-4 w-4" />
                <span>(+88) 01234567892</span>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-foreground mb-2 text-sm font-semibold md:text-base">
                Email Support
              </h3>
              <div className="text-primary flex items-center justify-center gap-2 text-sm md:text-base">
                <Mail className="h-4 w-4" />
                <span>returns@gadgetgrid.com</span>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-foreground mb-2 text-sm font-semibold md:text-base">
                Return Status
              </h3>
              <div className="text-primary flex items-center justify-center gap-2 text-sm md:text-base">
                <RotateCcw className="h-4 w-4" />
                <span>Track Return</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
