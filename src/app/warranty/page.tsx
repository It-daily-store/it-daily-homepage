import { Mail, Phone, Shield } from 'lucide-react';

export default function WarrantyPolicy() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="bg-pure-black/90 py-8 text-white sm:py-10 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Warranty Policy
          </h1>
          <p className="mx-auto max-w-2xl text-base text-white md:text-lg">
            Comprehensive warranty coverage and support for all your Gadget Grid
            purchases
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto space-y-4 px-3 py-3 sm:space-y-8 sm:py-5">
        {/* Warranty Coverage */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Warranty Coverage
          </h2>
          <p className="text-dark-gray text-sm leading-relaxed md:text-base">
            All products sold by Gadget Grid come with manufacturer warranty
            coverage. Warranty periods vary by product category and brand,
            ranging from 6 months to 3 years. The warranty covers manufacturing
            defects, hardware failures, and component malfunctions under normal
            usage conditions.
          </p>
          <p className="text-dark-gray mt-4 text-sm leading-relaxed md:text-base">
            Warranty coverage begins from the date of purchase and is valid only
            for products purchased directly from Gadget Grid or authorized
            dealers. Proof of purchase is required for all warranty claims.
          </p>
        </section>

        {/* Warranty Periods */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Warranty Periods by Category
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-foreground py-2 text-left font-semibold">
                    Product Category
                  </th>
                  <th className="text-foreground py-2 text-left font-semibold">
                    Warranty Period
                  </th>
                  <th className="text-foreground py-2 text-left font-semibold">
                    Coverage Type
                  </th>
                </tr>
              </thead>
              <tbody className="text-dark-gray">
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2">Laptops & Desktops</td>
                  <td className="py-2">1-3 Years</td>
                  <td className="py-2">Parts & Labor</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2">Smartphones & Tablets</td>
                  <td className="py-2">1-2 Years</td>
                  <td className="py-2">Hardware Only</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2">Components (CPU, RAM, GPU)</td>
                  <td className="py-2">2-5 Years</td>
                  <td className="py-2">Replacement</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2">Accessories</td>
                  <td className="py-2">6-12 Months</td>
                  <td className="py-2">Replacement</td>
                </tr>
                <tr>
                  <td className="py-2">Gaming Peripherals</td>
                  <td className="py-2">1-2 Years</td>
                  <td className="py-2">Parts & Labor</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* What's Covered */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            What&apos;s Covered
          </h2>
          <div className="space-y-4">
            <div className="border-primary border-l-4 pl-4">
              <h3 className="text-foreground text-sm font-semibold md:text-base">
                Manufacturing Defects
              </h3>
              <p className="text-dark-gray text-sm leading-relaxed">
                Defects in materials or workmanship that occur during normal use
                and are not caused by user error.
              </p>
            </div>
            <div className="border-primary border-l-4 pl-4">
              <h3 className="text-foreground text-sm font-semibold md:text-base">
                Hardware Failures
              </h3>
              <p className="text-dark-gray text-sm leading-relaxed">
                Component failures, system crashes, and hardware malfunctions
                not caused by physical damage.
              </p>
            </div>
            <div className="border-primary border-l-4 pl-4">
              <h3 className="text-foreground text-sm font-semibold md:text-base">
                Parts Replacement
              </h3>
              <p className="text-dark-gray text-sm leading-relaxed">
                Free replacement of defective parts and components covered under
                warranty terms.
              </p>
            </div>
            <div className="border-primary border-l-4 pl-4">
              <h3 className="text-foreground text-sm font-semibold md:text-base">
                Labor Costs
              </h3>
              <p className="text-dark-gray text-sm leading-relaxed">
                Professional repair services and labor costs for covered
                warranty repairs.
              </p>
            </div>
          </div>
        </section>

        {/* What's Not Covered */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            What&apos;s Not Covered
          </h2>
          <p className="text-dark-gray text-sm leading-relaxed md:text-base">
            Warranty does not cover damage caused by accidents, misuse, abuse,
            liquid spills, power surges, or unauthorized modifications. Physical
            damage, cosmetic wear, software issues, virus infections, and data
            loss are also excluded from warranty coverage.
          </p>
          <p className="text-dark-gray mt-4 text-sm leading-relaxed md:text-base">
            Consumable parts like batteries, fuses, and bulbs have limited
            warranty coverage. Products with removed or altered serial numbers,
            or those repaired by unauthorized service centers, void the
            warranty.
          </p>
        </section>

        {/* Warranty Claim Process */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            How to Claim Warranty
          </h2>
          <div className="space-y-4">
            <div className="border-primary border-l-4 pl-4">
              <h3 className="text-foreground text-sm font-semibold md:text-base">
                Step 1: Contact Support
              </h3>
              <p className="text-dark-gray text-sm leading-relaxed">
                Contact our warranty support team with your order number,
                product details, and description of the issue.
              </p>
            </div>
            <div className="border-primary border-l-4 pl-4">
              <h3 className="text-foreground text-sm font-semibold md:text-base">
                Step 2: Diagnosis
              </h3>
              <p className="text-dark-gray text-sm leading-relaxed">
                Our technicians will diagnose the issue remotely or request the
                product for physical inspection.
              </p>
            </div>
            <div className="border-primary border-l-4 pl-4">
              <h3 className="text-foreground text-sm font-semibold md:text-base">
                Step 3: Approval
              </h3>
              <p className="text-dark-gray text-sm leading-relaxed">
                Once the warranty claim is approved, we&apos;ll proceed with
                repair, replacement, or refund as applicable.
              </p>
            </div>
            <div className="border-primary border-l-4 pl-4">
              <h3 className="text-foreground text-sm font-semibold md:text-base">
                Step 4: Resolution
              </h3>
              <p className="text-dark-gray text-sm leading-relaxed">
                Receive your repaired or replacement product within 7-14
                business days of claim approval.
              </p>
            </div>
          </div>
        </section>

        {/* Extended Warranty */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Extended Warranty Options
          </h2>
          <p className="text-dark-gray text-sm leading-relaxed md:text-base">
            Extend your warranty coverage with our premium warranty plans.
            Extended warranties provide additional coverage beyond the standard
            manufacturer warranty, including accidental damage protection and
            priority support services.
          </p>
          <p className="text-dark-gray mt-4 text-sm leading-relaxed md:text-base">
            Extended warranty plans must be purchased within 30 days of the
            original purchase date. Plans are available for 1, 2, or 3
            additional years depending on the product category.
          </p>
        </section>

        {/* Service Centers */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Authorized Service Centers
          </h2>
          <p className="text-dark-gray text-sm leading-relaxed md:text-base">
            We have authorized service centers in major cities across
            Bangladesh. Our certified technicians use genuine parts and follow
            manufacturer guidelines for all warranty repairs. Service centers
            are equipped with advanced diagnostic tools and testing equipment.
          </p>
          <p className="text-dark-gray mt-4 text-sm leading-relaxed md:text-base">
            For products requiring specialized repair, we may need to send them
            to manufacturer service centers. This may extend the repair time but
            ensures the highest quality service and maintains warranty validity.
          </p>
        </section>

        {/* Contact Information */}
        <section className="rounded-lg bg-blue-50 p-3 sm:p-6 dark:bg-blue-900/30">
          <h2 className="text-primary mb-4 text-lg font-semibold md:text-xl">
            Warranty Support
          </h2>
          <p className="text-dark-gray mb-6 text-sm leading-relaxed md:text-base">
            For warranty claims, technical support, or service center locations,
            contact our warranty team:
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            <div className="text-center">
              <h3 className="text-foreground mb-2 text-sm font-semibold md:text-base">
                Warranty Hotline
              </h3>
              <div className="text-primary flex items-center justify-center gap-2 text-sm md:text-base">
                <Phone className="h-4 w-4" />
                <span>(+88) 01234567893</span>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-foreground mb-2 text-sm font-semibold md:text-base">
                Email Support
              </h3>
              <div className="text-primary flex items-center justify-center gap-2 text-sm md:text-base">
                <Mail className="h-4 w-4" />
                <span>warranty@itdaily.com</span>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-foreground mb-2 text-sm font-semibold md:text-base">
                Claim Status
              </h3>
              <div className="text-primary flex items-center justify-center gap-2 text-sm md:text-base">
                <Shield className="h-4 w-4" />
                <span>Check Warranty</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
