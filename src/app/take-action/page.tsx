import type { Metadata } from "next";
import Link from "next/link";
import { AtSign, Share2, Users } from "lucide-react";
import { Container } from "@/components/site/container";
import { odysseys } from "@/content/odysseys";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Take Action — OB1 Odysseys",
  description:
    "Concrete, specific actions from every OB1 odyssey — regulations to support, organizations to contact, and behaviors to change.",
};

const generalActions = [
  {
    icon: <AtSign className="size-5" />,
    title: `Follow ${siteConfig.instagramHandle}`,
    body: "New odysseys publish as short-form PSAs there first — the fastest way to see new field research as it drops.",
    href: siteConfig.instagramUrl,
    linkLabel: "Follow on Instagram",
  },
  {
    icon: <Share2 className="size-5" />,
    title: "Share the data, not just the story",
    body: "Every odyssey page is built to be linkable and shareable on its own — drop the specific odyssey link, not just the homepage, so people land on the sourced case.",
  },
  {
    icon: <Users className="size-5" />,
    title: "Bring this to a local decision-maker",
    body: "City councils, county boards, and local agencies respond to specifics. A sourced dataset and a clear ask travel further than general concern.",
  },
];

export default function TakeActionPage() {
  const odysseysWithActions = odysseys.filter(
    (o) => o.callToAction && o.callToAction.length > 0
  );

  return (
    <Container className="py-16">
      <p className="text-sm font-medium uppercase tracking-wide text-brand">
        Take action
      </p>
      <h1 className="mt-2 max-w-2xl font-heading text-4xl font-semibold sm:text-5xl">
        Specific, actionable — not just aware.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Evidence is only useful if it moves to action. Below are the concrete
        calls to action from every published odyssey, plus a few ways to
        engage with the program itself.
      </p>

      <section className="mt-14">
        <h2 className="font-heading text-2xl font-semibold">Get involved</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {generalActions.map((action) => (
            <div key={action.title} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex size-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                {action.icon}
              </div>
              <p className="mt-4 font-heading font-semibold">{action.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{action.body}</p>
              {action.href && (
                <a
                  href={action.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-sm font-medium text-brand hover:underline"
                >
                  {action.linkLabel} →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {odysseysWithActions.map((odyssey) => (
        <section key={odyssey.slug} className="mt-16">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-heading text-2xl font-semibold">
              From: {odyssey.title}
            </h2>
            <Link
              href={`/odysseys/${odyssey.slug}`}
              className="text-sm font-medium text-brand hover:underline"
            >
              Read the full case →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {odyssey.callToAction?.map((cta) => (
              <div key={cta.title} className="rounded-2xl border border-border bg-card p-5">
                <p className="font-heading font-semibold">{cta.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{cta.body}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="mt-16 rounded-2xl border border-border bg-secondary/40 p-8">
        <p className="font-heading text-lg font-semibold">More on the way</p>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          The Utah National Monuments and Joshua Tree odysseys will each add
          their own specific calls to action here once their research and
          analysis publish.
        </p>
      </section>
    </Container>
  );
}
