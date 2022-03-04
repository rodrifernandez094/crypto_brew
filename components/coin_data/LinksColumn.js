const LinksColumn = ({ data }) => {
  //prettier-ignore
  const links = {
    homepage: {link: data?.links?.homepage[0] ?? "", name: "Homepage"},
    community: [
        {link: data?.links?.official_forum_url[0] ?? "", name: "Forum"},
        {link: data?.links?.subreddit_url ?? "", name: "Reddit"},
        {link: `https://twitter.com/${data?.links?.twitter_screen_name}` ?? "", name: "Twitter"},
        {link: `https://facebook.com/${data?.links?.facebook_username}` ?? "", name: "Facebook"},
    ],
    source_code: {link: data?.links?.repos_url?.github[0] ?? "", name: "Github"}
  }

  return (
    //prettier-ignore
    <div className="lg:w-2/4 flex lg:justify-end">
        <div className="flex flex-col gap-6 px-4 py-12 max-w-sm text-sm">
            <span className="text-xl">Info</span>
            <div className="flex gap-4">
                <span className="capitalize w-1/3 mr-2">website</span>
                <a className="px-2 py-1 bg-gray-200 rounded" href={links.homepage.link}>
                {links.homepage.name}
                </a>
            </div>
            <div className="flex gap-4">
                <span className="capitalize w-1/3 min-w-1/3 mr-2">community</span>
                <div className="flex flex-wrap gap-2">
                {links.community.map((link, i) => {
                    return (
                    <a key={i} className="px-2 py-1 bg-gray-200 rounded" href={link.link}>
                        {link.name}
                    </a>
                    );
                })}
                </div>
            </div>
            <div className="flex gap-4">
                <span className="capitalize w-1/3 mr-2">source code</span>
                <a className="px-2 py-1 bg-gray-200 rounded" href={links.source_code.link}>{links.source_code.name}</a>
            </div>
        </div>
    </div>
  );
};

export default LinksColumn;
