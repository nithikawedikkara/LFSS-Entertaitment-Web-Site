export interface Site {
  name: string;
  url: string;
  status?: "trusted" | "new" | "ok" | "offline";
  description?: string;
  isPopular?: boolean;
  logoUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  sites: Site[];
}

export const categories: Category[] = [
  {
    id: "movies",
    name: "Movies & Shows",
    description: "Curated collection of top-rated free movie, series, and documentary streams.",
    sites: [
      { name: "1Shows", url: "https://www.1shows.org/", status: "trusted", description: "Minimalist indexing platform with ultra-fast search.", logoUrl: "https://tbcpl.lol/logo/movies_shows/1shows.png" },
      { name: "1Flex", url: "https://www.1flex.org/", status: "trusted", description: "Zero-latency media player with multiple hosters.", logoUrl: "https://tbcpl.lol/logo/movies_shows/1flex.png" },
      { name: "1Tube", url: "https://www.1tube.org/", status: "trusted", description: "Clean video catalog with high quality files.", logoUrl: "https://tbcpl.lol/logo/movies_shows/1tube.png" },
      { name: "shuttletv", url: "https://shuttletv.su/", description: "Excellent shuttle stream indexing.", logoUrl: "https://tbcpl.lol/logo/movies_shows/shuttletv.webp" },
      { name: "FlickyStream", url: "https://flickystream.su/", description: "Rapid loading server with subtitles.", logoUrl: "https://tbcpl.lol/logo/movies_shows/flickystream.png" },
      { name: "MeowTV", url: "https://meowtv.ru/", description: "Cute catalog interface with dual-audio support.", logoUrl: "https://tbcpl.lol/logo/movies_shows/meowtv.png" },
      { name: "RiveStream", url: "https://rivestream.ru/", description: "Clean interface, no popups or ads.", logoUrl: "https://tbcpl.lol/logo/movies_shows/rivestream.png" },
      { name: "CinemaBZ", url: "https://cinema.bz/", description: "High-definition cataloging for cinephiles.", logoUrl: "https://tbcpl.lol/logo/movies_shows/cinemabz.png" },
      { name: "Spenflix", url: "https://watch.spencerdevs.xyz/", status: "ok", description: "Premium player engine without redirects.", logoUrl: "https://tbcpl.lol/logo/movies_shows/spenflix.png" },
      { name: "FilmCave", url: "https://filmcave.ru/", description: "A library of movies and TV shows.", logoUrl: "https://tbcpl.lol/logo/movies_shows/filmcave.png" },
      { name: "popcorn", url: "https://popcornmovies.io/", description: "The classic pop-corn visual index.", logoUrl: "https://tbcpl.lol/logo/movies_shows/popcornmovies.png" },
      { name: "Cineby", url: "https://www.cineby.at/", description: "Exceptional player mechanics and catalog.", logoUrl: "https://tbcpl.lol/logo/movies_shows/cineby.png" },
      { name: "Nepu", url: "https://nepu.to/", description: "High availability servers.", logoUrl: "https://tbcpl.lol/logo/movies_shows/nepu.png" },
      { name: "netplayz", url: "https://netplayz.top/", description: "Interactive streaming directory.", logoUrl: "https://tbcpl.lol/logo/movies_shows/netplayz.png" },
      { name: "HollyMovieHD", url: "https://hollymoviehd.cc/", description: "Classic Hollywood releases in crystal-clear definition.", logoUrl: "https://tbcpl.lol/logo/movies_shows/hollymoviehd.png" },
      { name: "CinemaCity", url: "https://cinemacity.cc/", description: "Spacious layout with multiple server routes.", logoUrl: "https://tbcpl.lol/logo/movies_shows/cinemacity.png" },
      { name: "Moviebox", url: "https://h5.inmoviebox.com/", description: "Mobile-optimized media streamer interface.", logoUrl: "https://tbcpl.lol/logo/movies_shows/moviebox.png" },
      { name: "LordFlix", url: "https://lordflix.org/", description: "Ad-free library with premium streaming sources.", logoUrl: "https://tbcpl.lol/logo/movies_shows/lordflix.png" },
      { name: "Willow", url: "https://willow.arlen.icu/", description: "Fast, minimal and community-updated portal.", logoUrl: "https://tbcpl.lol/logo/movies_shows/willow.png" },
      { name: "345movie", url: "https://345movie.nl/", description: "European server hosting for rapid buffering.", logoUrl: "https://tbcpl.lol/logo/movies_shows/345movie.png" },
      { name: "FMovies", url: "https://fmovies-hd.to/home/", description: "Popular high-definition movie platform.", logoUrl: "https://tbcpl.lol/logo/movies_shows/fmovies.png" },
      { name: "WatchOTT", url: "https://watchott.ru", description: "Direct-to-server OTT stream provider.", logoUrl: "https://tbcpl.lol/logo/movies_shows/watchott.png" },
      { name: "Flixway", url: "https://flixway.ru/", description: "Minimalist look, maximal streaming efficiency.", logoUrl: "https://tbcpl.lol/logo/movies_shows/flixway.png" },
      { name: "StreamingUnity", url: "https://streamingunity.dog", description: "Community-driven unified video stream catalog.", logoUrl: "https://tbcpl.lol/logo/movies_shows/streamingcommunityz.png" }
    ]
  },
  {
    id: "anime",
    name: "Anime",
    description: "The best subbed and dubbed anime streams, synced trackers, and aggregates.",
    sites: [
      { name: "ReAnime", url: "https://reanime.to/home", status: "trusted", description: "Ultra-fast servers with zero lag watch sync.", logoUrl: "https://tbcpl.lol/logo/anime/reanime.png" },
      { name: "Miruro", url: "https://www.miruro.to", status: "trusted", description: "Aesthetic, modern interface with interactive tracker sync.", logoUrl: "https://tbcpl.lol/logo/anime/miruro.png" },
      { name: "animepahe", url: "https://animepahe.pw/", status: "trusted", description: "Classic lightweight compression for low data users.", logoUrl: "https://tbcpl.lol/logo/anime/animepahe.png" },
      { name: "Enma", url: "https://www.enma.lol", status: "trusted", description: "Elite modern catalog with no intrusive ads.", logoUrl: "https://tbcpl.lol/logo/anime/enma.png" },
      { name: "Anikage", url: "https://anikage.cc/home", description: "Slick anime layout with direct player links.", logoUrl: "https://tbcpl.lol/logo/anime/anikage.png" },
      { name: "Anikoto", url: "https://anikototv.to", description: "High quality Japanese animation archive.", logoUrl: "https://tbcpl.lol/logo/anime/anikoto.png" },
      { name: "AniDap", url: "https://anidap.se/home", description: "Scandinavian fast servers for global anime.", logoUrl: "https://tbcpl.lol/logo/anime/anidap.png" },
      { name: "SenpaiFlix", url: "https://senpaiflix.fun/", description: "Curated anime collections for dedicated fans.", logoUrl: "https://tbcpl.lol/logo/anime/senpaiflix.png" },
      { name: "Animex", url: "https://animex.one/home", description: "Minimalistic and lightning-fast anime hub.", logoUrl: "https://tbcpl.lol/logo/anime/animex.png" },
      { name: "AnimeNexus", url: "https://anime.nexus/", description: "Connect with the latest seasonal episodes.", logoUrl: "https://tbcpl.lol/logo/anime/animenexus.png" },
      { name: "1Anime", url: "https://1anime.app/discover", description: "Beautiful exploration engine with recommendation cards.", logoUrl: "https://tbcpl.lol/logo/anime/1anime.png" },
      { name: "Anistream", url: "https://anistream.one", description: "Fast-loading video players with premium mirrors.", logoUrl: "https://tbcpl.lol/logo/anime/anistream.png" },
      { name: "Animetsu", url: "https://animetsu.bz", description: "Comprehensive database of historical anime.", logoUrl: "https://tbcpl.lol/logo/anime/animetsu.png" },
      { name: "KickAssAnime", url: "https://kaa.lt/", description: "Reliable classic player layout with discussion feeds.", logoUrl: "https://tbcpl.lol/logo/anime/kickassanime.png" },
      { name: "FAnime", url: "https://fanime.tv/", description: "Interactive streaming directory.", logoUrl: "https://tbcpl.lol/logo/anime/fanime.png" },
      { name: "Justanime", url: "https://justanime.to/", description: "Pure video player focus without extra bloat.", logoUrl: "https://tbcpl.lol/logo/anime/justanime.png" },
      { name: "AniWaves", url: "https://aniwaves.ru", description: "Stunning waves of fresh subbed episodes.", logoUrl: "https://tbcpl.lol/logo/anime/aniwave.png" },
      { name: "AG48ANIME", url: "https://www.ag48anime.site/", description: "Underground catalog with rare classic OVA tracks.", logoUrl: "https://tbcpl.lol/logo/anime/ag48anime.png" },
      { name: "AniDB", url: "https://anidb.app/home", description: "The definitive cataloging engine.", logoUrl: "https://tbcpl.lol/logo/anime/anidb.png" },
      { name: "Animeheaven", url: "https://animeheaven.me/", description: "Classic staple for high-speed anime viewing.", logoUrl: "https://tbcpl.lol/logo/anime/animeheaven.png" },
      { name: "Anitaku", url: "https://anitaku.io/", description: "Comprehensive library updated instantly after broadcast.", logoUrl: "https://tbcpl.lol/logo/anime/anitaku.png" },
      { name: "Lunar", url: "https://lunaranime.ru/anime", description: "High-definition moonlit servers.", logoUrl: "https://tbcpl.lol/logo/anime/lunaranime.png" },
      { name: "AllManga", url: "https://allmanga.to/", status: "new", description: "Both Anime and Manga synced in one modern system.", logoUrl: "https://tbcpl.lol/logo/anime/allmanga.png" }
    ]
  },
  {
    id: "manga",
    name: "Manga & Reading",
    description: "Digital libraries, manga readers, and community scanlation aggregators.",
    sites: [
      { name: "MangaBall", url: "https://mangaball.net/", status: "trusted", description: "Blazing fast manga loader with multi-page read options.", logoUrl: "https://tbcpl.lol/logo/manga/mangaball.png" },
      { name: "Atsu", url: "https://atsu.moe/", status: "trusted", description: "Aesthetic web reader featuring gorgeous manga visuals.", logoUrl: "https://tbcpl.lol/logo/manga/atsumaru.png" },
      { name: "Onisaga", url: "https://onisaga.com/", status: "trusted", description: "Unrestricted directory for light novel and manga enthusiasts.", logoUrl: "https://tbcpl.lol/logo/manga/onisaga.png" },
      { name: "Kagane", url: "https://kagane.to/", description: "Sleek and responsive page navigation controls.", logoUrl: "https://tbcpl.lol/logo/manga/kagane.png" },
      { name: "Comick", url: "https://comick.dev/", description: "Excellent open source UI for chapters reading.", logoUrl: "https://tbcpl.lol/logo/manga/comick.png" },
      { name: "Comix", url: "https://comix.to/", description: "Graphic novels and webtoon catalog.", logoUrl: "https://tbcpl.lol/logo/manga/comix.png" },
      { name: "MangaDot", url: "https://mangadot.net/", description: "Direct manga translation indexes.", logoUrl: "https://tbcpl.lol/logo/manga/mangadot.png" },
      { name: "Qtoon", url: "https://qtoon.org/", description: "Webtoon specializations with continuous scroll.", logoUrl: "https://tbcpl.lol/logo/manga/qtoon.png" },
      { name: "MangaDex", url: "https://mangadex.org/", description: "The premier open source manga library of the internet.", logoUrl: "https://tbcpl.lol/logo/manga/mangadex.png" },
      { name: "Mangago", url: "https://mangago.me/", description: "Deep community forum with millions of listed releases.", logoUrl: "https://tbcpl.lol/logo/manga/mangago.png" },
      { name: "MangaFire", url: "https://mangafire.to/home", description: "Polished multi-server scanlation directory.", logoUrl: "https://tbcpl.lol/logo/manga/mangafire.png" },
      { name: "AllManga Reading", url: "https://allmanga.to/manga?cty=ALL", description: "Comprehensive list of international translations.", logoUrl: "https://tbcpl.lol/logo/manga/allmanga.png" },
      { name: "MangaKakalot", url: "https://www.mangakakalot.gg/", description: "Highly trusted staple of the web manga scene.", logoUrl: "https://tbcpl.lol/logo/manga/mangakakalot.png" },
      { name: "AsuraComic", url: "https://asurascans.com/", description: "Premium scanlations of action webtoons.", logoUrl: "https://tbcpl.lol/logo/manga/asuracomic.png" },
      { name: "MangaHub", url: "https://mangahub.io/", description: "Unified search across major scanlation catalogs.", logoUrl: "https://tbcpl.lol/logo/manga/mangahub.png" },
      { name: "WeebCentral", url: "https://weebcentral.com/", description: "Slick and optimized viewer settings.", logoUrl: "https://tbcpl.lol/logo/manga/weebcentral.png" },
      { name: "MangaKatana", url: "https://mangakatana.com/", description: "Fast updates and clean reading layout.", logoUrl: "https://tbcpl.lol/logo/manga/mangakatana.png" },
      { name: "AnimeZ Reading", url: "https://likemanga.ink/", description: "Diverse reading categories and translation guides.", logoUrl: "https://tbcpl.lol/logo/anime/animez.png" },
      { name: "Mangaxo", url: "https://mangaxo.com/home", description: "Lightweight and clean manga stream.", logoUrl: "https://tbcpl.lol/logo/manga/mangaxo.png" },
      { name: "AllManga Portal", url: "https://allmanga.to/", description: "Aggregates both light novels and comics.", logoUrl: "https://tbcpl.lol/logo/anime/allmanga.png" },
      { name: "King of Shojo", url: "https://kingofshojo.com", status: "new", description: "Dedicated catalog for romance and drama series.", logoUrl: "https://tbcpl.lol/logo/manga/kingofshojo.png" }
    ]
  },
  {
    id: "livetv",
    name: "Live TV & Sports",
    description: "Live channels, sporting streams, pay-per-view events, and IPTV indices.",
    sites: [
      { name: "DaddyLive", url: "https://dlhd.st/", status: "trusted", description: "Thousands of international channels and live events.", logoUrl: "https://tbcpl.lol/logo/livetv/daddylive.png" },
      { name: "Streamed.PK", url: "https://streamed.pk/", status: "trusted", description: "Ultra high definition sports stream aggregation.", logoUrl: "https://tbcpl.lol/logo/livetv/streamed.png" },
      { name: "Sport+", url: "https://en97.sportplus.watch/", description: "Full HD stream sources for global football tournaments.", logoUrl: "https://cdn.apigodata.com/sp-imgs/logo.svg" },
      { name: "TheTvApp", url: "https://thetvapptv.com", description: "American television channels with no setup required.", logoUrl: "https://tbcpl.lol/logo/livetv/tvappto.png" },
      { name: "NTVStream", url: "https://ntv.cx", description: "Fast streaming live television network proxy.", logoUrl: "https://tbcpl.lol/logo/livetv/ntvstream.png" },
      { name: "PublicIPTV", url: "https://publiciptv.com/", description: "Free open source list of public IPTV channels.", logoUrl: "https://tbcpl.lol/logo/livetv/publiciptv.png" },
      { name: "StreamEast", url: "https://streameastnow.net/", description: "The absolute classic live sports broadcasting portal.", logoUrl: "https://tbcpl.lol/logo/livetv/streameast.png" },
      { name: "iStreamEast", url: "https://thestreameast.top/", description: "Comprehensive live matches, schedules, and scores.", logoUrl: "https://tbcpl.lol/logo/livetv/istreameast.png" },
      { name: "SportSurge", url: "https://v2.sportsurge.net/", description: "Verified streaming directory sorted by game categories.", logoUrl: "https://tbcpl.lol/logo/livetv/streamsurge.png" },
      { name: "TV Garden", url: "https://famelack.com/", description: "Global television broadcast finder map catalog.", logoUrl: "https://tbcpl.lol/logo/livetv/tvgarden.png" },
      { name: "RiveStream Sports", url: "https://rivestream.ru/livesports/", description: "Live sporting events with high bitrate server pools.", logoUrl: "https://tbcpl.lol/logo/movies_shows/rivestream.png" },
      { name: "Sportsbite", url: "https://sportsbite.lol/", description: "Realtime sports links with helpful online chats.", logoUrl: "https://tbcpl.lol/logo/livetv/sportsbite.png" },
      { name: "Stmify", url: "https://stmify.com/", description: "Next-gen streams for formula sports, soccer, and fighting.", logoUrl: "https://tbcpl.lol/logo/livetv/stmify.png" },
      { name: "ppv.to", url: "https://ppv.st/", description: "Premium pay-per-view events mirrored directly.", logoUrl: "https://tbcpl.lol/logo/livetv/ppv.png" },
      { name: "fifstream1", url: "https://fifstream1.gt.tc/", status: "new", description: "Modern, direct streaming portal with low latency.", logoUrl: "https://tbcpl.lol/logo/livetv/fifstream1.png" }
    ]
  },
  {
    id: "paid",
    name: "Paid Services",
    description: "Quick direct links to official paid stream logins and subscription consoles.",
    sites: [
      { name: "Disney+", url: "https://www.disneyplus.com/identity/login/", description: "Home of Disney, Pixar, Marvel, Star Wars, and Nat Geo.", logoUrl: "https://tbcpl.lol/logo/paid_apps/disney+.png" },
      { name: "Shudder", url: "https://www.shudder.com/", description: "The premier subscription service for horror, thriller, and supernatural.", logoUrl: "https://tbcpl.lol/logo/paid_apps/shudder.png" },
      { name: "Hulu", url: "https://auth.hulu.com/web/login/", description: "Original movies, classic series, and live TV integrations.", logoUrl: "https://tbcpl.lol/logo/paid_apps/hulu.png" },
      { name: "Netflix", url: "https://www.netflix.com/", description: "The world's leading subscription platform for visual media.", logoUrl: "https://tbcpl.lol/logo/paid_apps/netflix.png" },
      { name: "Viki", url: "https://www.viki.com/", description: "Leading distributor of Asian dramas and entertainment.", logoUrl: "https://tbcpl.lol/logo/paid_apps/viki.png" },
      { name: "MAX", url: "https://www.hbomax.com/", description: "Warner Bros, HBO, DC, Cartoon Network, and Max Originals.", logoUrl: "https://www.hbomax.com/img/hbomax/logo_nav_bar.png" },
      { name: "Apple TV+", url: "https://tv.apple.com/", description: "Award-winning Apple Original series and feature films.", logoUrl: "https://tbcpl.lol/logo/paid_apps/appletv.png" },
      { name: "Amazon Prime", url: "https://www.amazon.com/gp/video/collection/IncludedwithPrime", description: "Included with Amazon Prime, massive worldwide catalogue.", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg" },
      { name: "Paramount+", url: "https://www.paramountplus.com/account/signin/", description: "Live sports, breaking news, and mountain of entertainment.", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Paramount_Plus.svg/1920px-Paramount_Plus.svg.png?_=20210312064352" },
      { name: "Crunchyroll", url: "https://crunchyroll.com/login", description: "The world's largest collection of official anime stream licenses.", logoUrl: "https://tbcpl.lol/logo/paid_apps/cruncyroll.png" },
      { name: "MGM+", url: "https://www.mgmplus.com/", description: "Premium television network offering original series and movies.", logoUrl: "https://tbcpl.lol/logo/paid_apps/mgm+.png" },
      { name: "Peacock", url: "https://www.peacocktv.com/start", description: "NBCUniversal streaming service with live sports and reality.", logoUrl: "https://tbcpl.lol/logo/paid_apps/Peacock.png" },
      { name: "AMC+", url: "https://www.amcplus.com/login", description: "The ultimate collection of award-winning AMC originals.", logoUrl: "https://tbcpl.lol/logo/paid_apps/amc+.png" }
    ]
  },
  {
    id: "apps",
    name: "Apps & Clients",
    description: "Media center apps, download tools, content blockers, and local clients.",
    sites: [
      { name: "Playtorrio", url: "https://playtorrio.pages.dev/", description: "Highly interactive web torrent client and stream player.", logoUrl: "https://tbcpl.lol/logo/apps/playtorrio.png" },
      { name: "OnStream APKs", url: "https://onstreamapks.app/", description: "The premier Android streaming application catalog.", logoUrl: "https://tbcpl.lol/logo/apps/onstream.png" },
      { name: "BeeTV", url: "https://beetvs.com.co/", description: "Popular client for streaming movies on Android boxes.", logoUrl: "https://tbcpl.lol/logo/apps/beetv.png" },
      { name: "HDO Box", url: "https://hdobox.net/", description: "Smooth and optimized Android mobile entertainment player.", logoUrl: "https://tbcpl.lol/logo/apps/hdobox.png" },
      { name: "MovieBox", url: "https://www.moviesbox.com.co/home/", description: "Elegant iOS and Android visual hub.", logoUrl: "https://tbcpl.lol/logo/apps/moviebox.png" },
      { name: "NetMirror", url: "https://netmirror.gg/2/en", description: "Bypass region blocks and mirror Netflix contents locally.", logoUrl: "https://tbcpl.lol/logo/apps/netmirror.png" },
      { name: "PikaShow", url: "https://pikashowtv.in/", description: "Vast collection of channels and films on mobile application format.", logoUrl: "https://tbcpl.lol/logo/apps/pikashow.png" },
      { name: "MobiFlix", url: "https://mobiflix.tv/", description: "Direct APK links for high speed video stream playback.", logoUrl: "https://tbcpl.lol/logo/apps/mobiflix.png" },
      { name: "YouCine", url: "https://youcineapkpro.com/", status: "new", description: "Modern, bilingual media application for smart TVs.", logoUrl: "https://tbcpl.lol/logo/livetv/youcine.webp" },
      { name: "PlayFy", url: "https://playfy.live/", description: "Fast multimedia streaming engine and link indexer.", logoUrl: "https://tbcpl.lol/logo/apps/playfy.png" }
    ]
  }
];

export interface FlatSite extends Site {
  categoryId: string;
  categoryName: string;
}

export const allSites: FlatSite[] = categories.flatMap(c =>
  c.sites.map(s => ({ ...s, categoryId: c.id, categoryName: c.name }))
);
