import { Pump } from 'basehub/react-pump'
import { RichText } from 'basehub/react-rich-text'
import { Section } from './_components/section'
import Link from 'next/link'
import { viewsFragment } from './_components/views-fragment'
import clsx from 'clsx'
import { PageWrapper } from './_components/page-wrapper'
import { DynamicIcon } from './_components/dynamic-icon'
import { LinkWithAnalytics } from './_components/link-with-analytics'
import Image from 'next/image'

export const dynamic = 'force-static'

const HomePage = async () => {
  return (
    <Pump
      queries={[
        {
          index: {
            avatar: {
              url: {
                __args: {
                  width: 300,
                  height: 300,
                },
              },
              alt: true,
              width: true,
              height: true,
            },
            title: true,
            bio: {
              json: {
                content: true,
              },
            },
            recentContributionsSection: {
              sectionHeader: {
                title: true,
                subtitle: {
                  json: {
                    content: true,
                  },
                },
              },
              contributions: {
                items: {
                  _id: true,
                  _title: true,
                  description: {
                    json: {
                      content: true,
                    },
                  },
                  added: true,
                  removed: true,
                  type: true,
                  label: true,
                  href: true,
                  icon: true,
                  clicks: { ingestKey: true },
                },
              },
            },
            postsSection: {
              header: {
                title: true,
                subtitle: {
                  json: {
                    content: true,
                  },
                },
              },
              posts: {
                items: {
                  _id: true,
                  views: viewsFragment,
                  _title: true,
                  _slug: true,
                  __typename: true,
                  excerpt: true,
                  body: {
                    plainText: true,
                  },
                  date: true,
                },
              },
            },
          },
        },
      ]}
    >
      {async ([{ index }]) => {
        'use server'

        return (
          <PageWrapper bg="black">
            {/* hero */}
            <section className="flex max-w-[40rem] w-full flex-col items-start gap-8">
              <div>
                <Image
                  src={index.avatar.url}
                  alt={index.avatar.alt ?? ''}
                  width={index.avatar.width}
                  height={index.avatar.height}
                  className="border select-none border-dark-gray6 w-28 h-28"
                />
              </div>
              <div className="flex flex-col gap-1.5 text-start">
                <h1 className="text-sm font-semibold text-balance">
                  {index.title}
                </h1>
                <div className="text-xs leading-snug text-dark-gray10 text-balance">
                  <RichText
                    components={{
                      a: (props) => (
                        <a
                          {...props}
                          className="underline hover:text-dark-gray11 transition-colors"
                        />
                      ),
                    }}
                  >
                    {index.bio.json.content}
                  </RichText>
                </div>
              </div>
              {/* posts */}
              <Section
                title={index.postsSection.header.title}
                subtitle={
                  index.postsSection.header.subtitle ? (
                    <RichText>
                      {index.postsSection.header.subtitle.json.content}
                    </RichText>
                  ) : null
                }
              >
                <div className="flex flex-col gap-3.5 w-full items-start">
                  {index.postsSection.posts.items.map((post) => {
                    return (
                      <Link
                        key={post._id}
                        className="transition-colors w-full items-center justify-between  rounded-lg flex flex-row gap-2"
                        href={`/posts/${post._slug}`}
                      >
                        <h3 className="font-medium text-xs hover:underline hover:text-dark-gray11 transition-colors text-balance">
                          {post._title}
                        </h3>
                        <p className="text-xs text-dark-gray10">
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </Link>
                    )
                  })}
                </div>
              </Section>

              {/* recent contributions */}
              <Section
                title={index.recentContributionsSection.sectionHeader.title}
                subtitle={
                  index.recentContributionsSection.sectionHeader.subtitle ? (
                    <RichText>
                      {
                        index.recentContributionsSection.sectionHeader.subtitle
                          .json.content
                      }
                    </RichText>
                  ) : null
                }
              >
                <div className="flex gap-2 flex-wrap justify-start w-full  overflow-hidden">
                  <iframe
                    style={{
                      filter: 'invert(1) hue-rotate(180deg)',
                    }}
                    src="https://jandee.vercel.app/fveiraswww"
                    width="100%"
                    height="120px"
                  ></iframe>
                  {index.recentContributionsSection.contributions.items.map(
                    (post) => {
                      const props = post.href
                        ? {
                            href: post.href,
                            className: 'hover:bg-dark-gray5 transition-colors',
                            target: '_blank',
                            rel: 'noopener',
                            ingestKey: post.clicks.ingestKey,
                          }
                        : {}

                      const className = clsx(
                        props.className,
                        'p-1.5 pr-2 select-none flex gap-1.5 w-full items-center leading-none text-dark-gray12 text-xs bg-dark-gray3 border border-dark-gray6',
                        post.href && 'hover:bg-dark-gray5 transition-colors'
                      )

                      const children = (
                        <div className="flex flex-row h-full w-full items-center justify-between">
                          <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2 items-center">
                              {post.icon && (
                                <span>
                                  <DynamicIcon name={post.icon as 'X'} />
                                </span>
                              )}
                              <span className="whitespace-nowrap font-bold text-ellipsis overflow-hidden">
                                {post.label}
                              </span>
                            </div>
                            <RichText>
                              {post.description?.json.content}
                            </RichText>
                          </div>
                          <div className="flex flex-row gap-2">
                            {post.icon === 'Pr' && (
                              <>
                                <p className="text-[#00d492]/70">
                                  +{post.added}
                                </p>
                                <p className="text-[#ff6467]/70">
                                  -{post.removed}
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      )

                      if (post.href) {
                        return (
                          <LinkWithAnalytics
                            key={post._id}
                            className={className}
                            href={post.href}
                            target="_blank"
                            ingestKey={post.clicks.ingestKey}
                          >
                            {children}
                          </LinkWithAnalytics>
                        )
                      }

                      return (
                        <p key={post._id} {...props} className={className}>
                          {children}
                        </p>
                      )
                    }
                  )}
                </div>
              </Section>
            </section>
          </PageWrapper>
        )
      }}
    </Pump>
  )
}

export default HomePage
