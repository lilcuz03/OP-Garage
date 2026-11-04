import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import LegalLayout, {
  type LegalSectionData,
} from "@/components/ui/LegalLayout";
import { legal } from "@/data/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Legal Notice",
  description:
    "Legal notice for OP Garage & Gate Repairs, Durban: who operates this website, how to use it, and the terms that apply.",
  alternates: { canonical: "/legal-notice" },
};

const details: [string, ReactNode][] = [
  ["Trading name", legal.tradingName],
  ["Registered name", legal.registeredName],
  ["Registration number", legal.registrationNumber],
  ["VAT number", legal.vatNumber],
  ["Location", "Durban, KwaZulu-Natal, South Africa"],
  ["Physical address", legal.physicalAddress],
  [
    "Phone",
    <a
      key="phone"
      href={site.phoneHref}
    >
      {site.phone}
    </a>,
  ],
  [
    "Email",
    <a
      key="email"
      href={`mailto:${site.email}`}
    >
      {site.email}
    </a>,
  ],
];

const sections: LegalSectionData[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    content: (
      <>
        <p>
          This website is operated by <strong>{legal.tradingName}</strong>, a
          garage door, gate motor and electric fence repair and installation
          business based in Durban, KwaZulu-Natal, South Africa.
        </p>
        <dl className="divide-y divide-line rounded-2xl border border-line bg-surface">
          {details
            .filter(([, value]) => value)
            .map(([label, value]) => (
              <div
                key={label}
                className="flex flex-col gap-1 p-4 sm:flex-row sm:gap-6"
              >
                <dt className="shrink-0 text-sm font-medium text-foreground sm:w-44">
                  {label}
                </dt>
                <dd className="text-sm">{value}</dd>
              </div>
            ))}
        </dl>
      </>
    ),
  },
  {
    id: "use-of-website",
    title: "Use of this website",
    content: (
      <p>
        The information on this website is provided in good faith and for
        general information. We work to keep it accurate and up to date, but we
        do not guarantee that it is complete or current at all times.
      </p>
    ),
  },
  {
    id: "quotes-and-services",
    title: "Quotes, services and warranties",
    content: (
      <>
        <p>
          Nothing on this website is a binding offer. Prices, timeframes and the
          scope of work are confirmed with you in a quote, usually after we have
          discussed or inspected the job. The services listed here are examples
          of what we do, and we do much more, so please ask.
        </p>
        <p>
          We offer warranties on the vast majority of our services. The warranty
          that applies to your job is confirmed when we quote.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    content: (
      <>
        <p>
          The content of this website, including text, logo, images and design,
          belongs to {legal.tradingName} or is used with permission. You may
          view the pages and share links to them, but you may not copy,
          reproduce or reuse the content for commercial purposes without our
          written permission.
        </p>
        <p>
          The website was designed and developed by{" "}
          <a
            href="https://tafadzwa.site/"
            target="_blank"
            rel="noopener noreferrer"
          >
            taachii
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "third-party-services",
    title: "Third-party services and links",
    content: (
      <p>
        This website uses or links to services run by other companies, including
        Google (maps and reviews), WhatsApp and our hosting provider. We do not
        control these services and are not responsible for their content or
        privacy practices. Please read their own terms and policies.
      </p>
    ),
  },
  {
    id: "reviews",
    title: "Reviews and testimonials",
    content: (
      <p>
        Customer reviews and testimonials reflect the personal opinions of the
        people who wrote them. Reviews marked as Google reviews are provided by
        Google and shown as supplied.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    content: (
      <p>
        To the fullest extent permitted by law, we are not liable for any loss
        or damage that results from using this website or relying on its
        content. Nothing in this notice limits any right you have under the
        Consumer Protection Act 68 of 2008 or any other law that cannot be
        limited or excluded.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law",
    content: (
      <p>
        This notice and your use of this website are governed by the laws of the
        Republic of South Africa.
      </p>
    ),
  },
  {
    id: "changes-and-contact",
    title: "Changes and contact",
    content: (
      <>
        <p>
          We may update this notice from time to time. The date at the top of
          the page shows when it was last changed.
        </p>
        <p>
          Questions? Email us at{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
          <a href={site.phoneHref}>{site.phone}</a>. See also our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </>
    ),
  },
];

export default function LegalNoticePage() {
  return (
    <LegalLayout
      crumb="Legal Notice"
      title="Legal Notice"
      intro="Who operates this website, how it may be used, and the terms that apply."
      updated={legal.lastUpdated}
      sections={sections}
    />
  );
}
