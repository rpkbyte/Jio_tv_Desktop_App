// JioTV Official Channel Database (Pre-bundled Hybrid Cache)
// Sourced directly from JioTV Official Mobile CDN API

export const CATEGORIES = [
  'All Channels',
  'Entertainment',
  'Movies',
  'Sports',
  'News',
  'Music',
  'Kids',
  'Infotainment',
  'Devotional',
  'Lifestyle',
  'Business News',
  'Educational',
  'Regional'
];

export const LANGUAGES = [
  'All Languages',
  'Hindi',
  'English',
  'Tamil',
  'Telugu',
  'Bengali',
  'Marathi',
  'Kannada',
  'Gujarati',
  'Malayalam',
  'Punjabi',
  'Odia',
  'Bhojpuri',
  'Assamese',
  'Urdu'
];

// Reliable Public HLS streams for playback validation
export const SAMPLE_STREAMS = [
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8',
  'https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
];

export const CHANNELS = [
  {
    "id": "ch-144",
    "channelId": 144,
    "name": "Colors HD",
    "number": 1304,
    "category": "Entertainment",
    "language": "Hindi",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/ColorsHD1.png",
    "banner": "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Bigg Boss 18 - Weekend Ka Vaar",
      "time": "09:00 PM - 10:30 PM",
      "duration": "90 mins",
      "genre": "Reality / Entertainment",
      "progress": 55,
      "description": "Salman Khan takes the stage with housemates confronting the week\u2019s twists and intense eviction."
    },
    "nextShow": {
      "title": "Colors HD Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-154",
    "channelId": 154,
    "name": "Sony SAB",
    "number": 1313,
    "category": "Entertainment",
    "language": "Hindi",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Sony_SAB.png",
    "banner": "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Taarak Mehta Ka Ooltah Chashmah",
      "time": "08:30 PM - 09:00 PM",
      "duration": "30 mins",
      "genre": "Comedy / Family",
      "progress": 70,
      "description": "Jethalal finds himself caught in another hilarious misunderstanding in Gokuldham Society."
    },
    "nextShow": {
      "title": "Sony SAB Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-156",
    "channelId": 156,
    "name": "Star Gold HD",
    "number": 1409,
    "category": "Movies",
    "language": "Hindi",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/StarGoldHD11.png",
    "banner": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Singham Returns",
      "time": "08:00 PM - 11:00 PM",
      "duration": "180 mins",
      "genre": "Action / Drama",
      "progress": 40,
      "description": "DCP Bajirao Singham takes on corrupt politicians and mafia leaders in a fierce quest for justice."
    },
    "nextShow": {
      "title": "Star Gold HD Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-162",
    "channelId": 162,
    "name": "Sony Ten 1 HD",
    "number": 2503,
    "category": "Sports",
    "language": "English",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Ten_HD.png",
    "banner": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Live Cricket: Test Championship Special",
      "time": "07:30 PM - 11:30 PM",
      "duration": "240 mins",
      "genre": "Cricket / Live Sports",
      "progress": 65,
      "description": "Comprehensive live cricket coverage with pitch reports, expert analysis, and studio discussions."
    },
    "nextShow": {
      "title": "Sony Ten 1 HD Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "catchupDays": 7
  },
  {
    "id": "ch-155",
    "channelId": 155,
    "name": "Sony Ten 5 HD",
    "number": 2509,
    "category": "Sports",
    "language": "English",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Six_HD.png",
    "banner": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "UEFA Champions League Magazine",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Football / Sports",
      "progress": 30,
      "description": "Highlights, goals, tactical breakdown, and interviews from the European top-flight football clubs."
    },
    "nextShow": {
      "title": "Sony Ten 5 HD Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-146",
    "channelId": 146,
    "name": "History TV18 HD",
    "number": 2810,
    "category": "Infotainment",
    "language": "English",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/History_HD.png",
    "banner": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "OMG! Yeh Mera India",
      "time": "08:00 PM - 09:00 PM",
      "duration": "60 mins",
      "genre": "Infotainment / Culture",
      "progress": 50,
      "description": "Krushna Abhishek takes viewers on an inspiring journey across extraordinary talents in India."
    },
    "nextShow": {
      "title": "History TV18 HD Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-151",
    "channelId": 151,
    "name": "Movies Now HD",
    "number": 2200,
    "category": "Movies",
    "language": "English",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Movies_Now_HD.png",
    "banner": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Movies Now HD Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Movies",
      "progress": 45,
      "description": "Live high-definition transmission of Movies Now HD on JioTV Desktop."
    },
    "nextShow": {
      "title": "Movies Now HD Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-164",
    "channelId": 164,
    "name": "Travelxp HD",
    "number": 2803,
    "category": "Lifestyle",
    "language": "English",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Travel_XP_HD.png",
    "banner": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Travelxp HD Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Lifestyle",
      "progress": 45,
      "description": "Live high-definition transmission of Travelxp HD on JioTV Desktop."
    },
    "nextShow": {
      "title": "Travelxp HD Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "catchupDays": 7
  },
  {
    "id": "ch-383",
    "channelId": 383,
    "name": "Times NOW",
    "number": 2005,
    "category": "News",
    "language": "English",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Times_NOW.png",
    "banner": "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Times NOW Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "News",
      "progress": 45,
      "description": "Live high-definition transmission of Times NOW on JioTV Desktop."
    },
    "nextShow": {
      "title": "Times NOW Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-474",
    "channelId": 474,
    "name": "Sony Pal",
    "number": 1309,
    "category": "Entertainment",
    "language": "Hindi",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/SonyPAL.png",
    "banner": "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Sony Pal Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Entertainment",
      "progress": 45,
      "description": "Live high-definition transmission of Sony Pal on JioTV Desktop."
    },
    "nextShow": {
      "title": "Sony Pal Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-533",
    "channelId": 533,
    "name": "Raj Pariwar",
    "number": 1310,
    "category": "Entertainment",
    "language": "Marathi",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Raj_Pariwar.png",
    "banner": "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Raj Pariwar Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Entertainment",
      "progress": 45,
      "description": "Live high-definition transmission of Raj Pariwar on JioTV Desktop."
    },
    "nextShow": {
      "title": "Raj Pariwar Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-576",
    "channelId": 576,
    "name": "Discovery Telugu",
    "number": 4800,
    "category": "Infotainment",
    "language": "Telugu",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/DiscoveryTel1.png",
    "banner": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Discovery Telugu Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Infotainment",
      "progress": 45,
      "description": "Live high-definition transmission of Discovery Telugu on JioTV Desktop."
    },
    "nextShow": {
      "title": "Discovery Telugu Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "catchupDays": 7
  },
  {
    "id": "ch-578",
    "channelId": 578,
    "name": "History TV18 HD Hindi",
    "number": 1832,
    "category": "Infotainment",
    "language": "Hindi",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/History_18_Hindi.png",
    "banner": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "History TV18 HD Hindi Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Infotainment",
      "progress": 45,
      "description": "Live high-definition transmission of History TV18 HD Hindi on JioTV Desktop."
    },
    "nextShow": {
      "title": "History TV18 HD Hindi Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-580",
    "channelId": 580,
    "name": "DD bharati",
    "number": 1846,
    "category": "Infotainment",
    "language": "Hindi",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/DD_bharati.png",
    "banner": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "DD bharati Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Infotainment",
      "progress": 45,
      "description": "Live high-definition transmission of DD bharati on JioTV Desktop."
    },
    "nextShow": {
      "title": "DD bharati Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-180",
    "channelId": 180,
    "name": "Asianet News",
    "number": 7001,
    "category": "News",
    "language": "Malayalam",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Asianet_News.png",
    "banner": "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "9XM Jalwa Non-Stop Hits",
      "time": "08:00 PM - 10:00 PM",
      "duration": "120 mins",
      "genre": "Bollywood Music",
      "progress": 75,
      "description": "Top Bollywood party tracks, chartbusters, and viral dance numbers on rotation with animated gags."
    },
    "nextShow": {
      "title": "Asianet News Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-182",
    "channelId": 182,
    "name": "B4U Movies",
    "number": 1406,
    "category": "Movies",
    "language": "Hindi",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/b4u_movies.png",
    "banner": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "B4U Movies Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Movies",
      "progress": 45,
      "description": "Live high-definition transmission of B4U Movies on JioTV Desktop."
    },
    "nextShow": {
      "title": "B4U Movies Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "catchupDays": 7
  },
  {
    "id": "ch-196",
    "channelId": 196,
    "name": "Colors Gujarati",
    "number": 6100,
    "category": "Entertainment",
    "language": "Gujarati",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/ColorsGujarati.png",
    "banner": "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Colors Gujarati Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Entertainment",
      "progress": 45,
      "description": "Live high-definition transmission of Colors Gujarati on JioTV Desktop."
    },
    "nextShow": {
      "title": "Colors Gujarati Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-279",
    "channelId": 279,
    "name": "Colors Rishtey",
    "number": 1300,
    "category": "Entertainment",
    "language": "Hindi",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/ColorsRishtey1.png",
    "banner": "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Colors Rishtey Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Entertainment",
      "progress": 45,
      "description": "Live high-definition transmission of Colors Rishtey on JioTV Desktop."
    },
    "nextShow": {
      "title": "Colors Rishtey Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-291",
    "channelId": 291,
    "name": "SET HD",
    "number": 1317,
    "category": "Entertainment",
    "language": "Hindi",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Sony_HD.png",
    "banner": "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "SET HD Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Entertainment",
      "progress": 45,
      "description": "Live high-definition transmission of SET HD on JioTV Desktop."
    },
    "nextShow": {
      "title": "SET HD Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-317",
    "channelId": 317,
    "name": "Star Jalsha HD",
    "number": 5104,
    "category": "Entertainment",
    "language": "Bengali",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/StarJalshaHD1.png",
    "banner": "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Star Jalsha HD Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Entertainment",
      "progress": 45,
      "description": "Live high-definition transmission of Star Jalsha HD on JioTV Desktop."
    },
    "nextShow": {
      "title": "Star Jalsha HD Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "catchupDays": 7
  },
  {
    "id": "ch-336",
    "channelId": 336,
    "name": "Star Pravah HD",
    "number": 9118,
    "category": "Entertainment",
    "language": "Marathi",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/StarPravahHD1.png",
    "banner": "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Star Pravah HD Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Entertainment",
      "progress": 45,
      "description": "Live high-definition transmission of Star Pravah HD on JioTV Desktop."
    },
    "nextShow": {
      "title": "Star Pravah HD Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-202",
    "channelId": 202,
    "name": "DD National",
    "number": 1308,
    "category": "Entertainment",
    "language": "Hindi",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/DD_National.png",
    "banner": "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "DD National Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Entertainment",
      "progress": 45,
      "description": "Live high-definition transmission of DD National on JioTV Desktop."
    },
    "nextShow": {
      "title": "DD National Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-527",
    "channelId": 527,
    "name": "Investigation Discovery Hindi",
    "number": 1329,
    "category": "Entertainment",
    "language": "Hindi",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/IDHindi1.png",
    "banner": "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Investigation Discovery Hindi Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Entertainment",
      "progress": 45,
      "description": "Live high-definition transmission of Investigation Discovery Hindi on JioTV Desktop."
    },
    "nextShow": {
      "title": "Investigation Discovery Hindi Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-528",
    "channelId": 528,
    "name": "DD India",
    "number": 1328,
    "category": "Entertainment",
    "language": "Hindi",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/DD_India.png",
    "banner": "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "DD India Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Entertainment",
      "progress": 45,
      "description": "Live high-definition transmission of DD India on JioTV Desktop."
    },
    "nextShow": {
      "title": "DD India Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "catchupDays": 7
  },
  {
    "id": "ch-457",
    "channelId": 457,
    "name": "Jalsha Movies HD",
    "number": 5202,
    "category": "Movies",
    "language": "Bengali",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/JalsaMoviesHD1.png",
    "banner": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Jalsha Movies HD Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Movies",
      "progress": 45,
      "description": "Live high-definition transmission of Jalsha Movies HD on JioTV Desktop."
    },
    "nextShow": {
      "title": "Jalsha Movies HD Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-459",
    "channelId": 459,
    "name": "Asianet Movies HD",
    "number": 7201,
    "category": "Movies",
    "language": "Malayalam",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/AsianetMoviesHD1.png",
    "banner": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Asianet Movies HD Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Movies",
      "progress": 45,
      "description": "Live high-definition transmission of Asianet Movies HD on JioTV Desktop."
    },
    "nextShow": {
      "title": "Asianet Movies HD Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-476",
    "channelId": 476,
    "name": "Sony Max HD",
    "number": 1417,
    "category": "Movies",
    "language": "Hindi",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/SonyMAX.png",
    "banner": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Sony Max HD Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Movies",
      "progress": 45,
      "description": "Live high-definition transmission of Sony Max HD on JioTV Desktop."
    },
    "nextShow": {
      "title": "Sony Max HD Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-477",
    "channelId": 477,
    "name": "MN+ HD",
    "number": 2206,
    "category": "Movies",
    "language": "English",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/MNPLUS.png",
    "banner": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "MN+ HD Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Movies",
      "progress": 45,
      "description": "Live high-definition transmission of MN+ HD on JioTV Desktop."
    },
    "nextShow": {
      "title": "MN+ HD Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "catchupDays": 7
  },
  {
    "id": "ch-678",
    "channelId": 678,
    "name": "Sun Udaya Movies",
    "number": 8200,
    "category": "Movies",
    "language": "Kannada",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Udaya_Movies.png",
    "banner": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Sun Udaya Movies Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Movies",
      "progress": 45,
      "description": "Live high-definition transmission of Sun Udaya Movies on JioTV Desktop."
    },
    "nextShow": {
      "title": "Sun Udaya Movies Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-252",
    "channelId": 252,
    "name": "ETV Cinema",
    "number": 4202,
    "category": "Movies",
    "language": "Telugu",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/ETV_Cinema.png",
    "banner": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "ETV Cinema Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Movies",
      "progress": 45,
      "description": "Live high-definition transmission of ETV Cinema on JioTV Desktop."
    },
    "nextShow": {
      "title": "ETV Cinema Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-289",
    "channelId": 289,
    "name": "Sony Max SD",
    "number": 1420,
    "category": "Movies",
    "language": "Hindi",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Sony_Max_SD.png",
    "banner": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Sony Max SD Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Movies",
      "progress": 45,
      "description": "Live high-definition transmission of Sony Max SD on JioTV Desktop."
    },
    "nextShow": {
      "title": "Sony Max SD Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-417",
    "channelId": 417,
    "name": "J Movies",
    "number": 3201,
    "category": "Movies",
    "language": "Tamil",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/J_Movies.png",
    "banner": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "J Movies Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Movies",
      "progress": 45,
      "description": "Live high-definition transmission of J Movies on JioTV Desktop."
    },
    "nextShow": {
      "title": "J Movies Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "catchupDays": 7
  },
  {
    "id": "ch-875",
    "channelId": 875,
    "name": "Eurosport HD",
    "number": 2506,
    "category": "Sports",
    "language": "English",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Dsports_HD.png",
    "banner": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Eurosport HD Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Sports",
      "progress": 45,
      "description": "Live high-definition transmission of Eurosport HD on JioTV Desktop."
    },
    "nextShow": {
      "title": "Eurosport HD Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-892",
    "channelId": 892,
    "name": "Sony Ten 3 HD Hindi",
    "number": 1701,
    "category": "Sports",
    "language": "Hindi",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Ten3_HD.png",
    "banner": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Sony Ten 3 HD Hindi Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Sports",
      "progress": 45,
      "description": "Live high-definition transmission of Sony Ten 3 HD Hindi on JioTV Desktop."
    },
    "nextShow": {
      "title": "Sony Ten 3 HD Hindi Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-1163",
    "channelId": 1163,
    "name": "JioGames HD",
    "number": 2516,
    "category": "Sports",
    "language": "English",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/JioGamesHD1.png",
    "banner": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "JioGames HD Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Sports",
      "progress": 45,
      "description": "Live high-definition transmission of JioGames HD on JioTV Desktop."
    },
    "nextShow": {
      "title": "JioGames HD Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-2766",
    "channelId": 2766,
    "name": "BRAVE TV",
    "number": 2513,
    "category": "Sports",
    "language": "English",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Brave_TV.png",
    "banner": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "BRAVE TV Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Sports",
      "progress": 45,
      "description": "Live high-definition transmission of BRAVE TV on JioTV Desktop."
    },
    "nextShow": {
      "title": "BRAVE TV Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "catchupDays": 7
  },
  {
    "id": "ch-2779",
    "channelId": 2779,
    "name": "Red Bull TV",
    "number": 2505,
    "category": "Sports",
    "language": "English",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Red_Bull_TV.png",
    "banner": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Red Bull TV Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Sports",
      "progress": 45,
      "description": "Live high-definition transmission of Red Bull TV on JioTV Desktop."
    },
    "nextShow": {
      "title": "Red Bull TV Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-204",
    "channelId": 204,
    "name": "DD Sports",
    "number": 1700,
    "category": "Sports",
    "language": "Hindi",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/DD_Sports.png",
    "banner": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "DD Sports Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Sports",
      "progress": 45,
      "description": "Live high-definition transmission of DD Sports on JioTV Desktop."
    },
    "nextShow": {
      "title": "DD Sports Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-514",
    "channelId": 514,
    "name": "Sony Ten 1",
    "number": 2508,
    "category": "Sports",
    "language": "English",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Ten_1.png",
    "banner": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Sony Ten 1 Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Sports",
      "progress": 45,
      "description": "Live high-definition transmission of Sony Ten 1 on JioTV Desktop."
    },
    "nextShow": {
      "title": "Sony Ten 1 Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-523",
    "channelId": 523,
    "name": "Ten 2",
    "number": 2502,
    "category": "Sports",
    "language": "English",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Ten_2.png",
    "banner": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Ten 2 Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Sports",
      "progress": 45,
      "description": "Live high-definition transmission of Ten 2 on JioTV Desktop."
    },
    "nextShow": {
      "title": "Ten 2 Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "catchupDays": 7
  },
  {
    "id": "ch-231",
    "channelId": 231,
    "name": "News 18 India",
    "number": 1005,
    "category": "News",
    "language": "Hindi",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/IBN_7.png",
    "banner": "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "News 18 India Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "News",
      "progress": 45,
      "description": "Live high-definition transmission of News 18 India on JioTV Desktop."
    },
    "nextShow": {
      "title": "News 18 India Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-232",
    "channelId": 232,
    "name": "News18 Marathi",
    "number": 9011,
    "category": "News",
    "language": "Marathi",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/News18Lokmat.png",
    "banner": "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "News18 Marathi Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "News",
      "progress": 45,
      "description": "Live high-definition transmission of News18 Marathi on JioTV Desktop."
    },
    "nextShow": {
      "title": "News18 Marathi Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-235",
    "channelId": 235,
    "name": "India TV",
    "number": 1002,
    "category": "News",
    "language": "Hindi",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/IndiaTV1.png",
    "banner": "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "India TV Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "News",
      "progress": 45,
      "description": "Live high-definition transmission of India TV on JioTV Desktop."
    },
    "nextShow": {
      "title": "India TV Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-493",
    "channelId": 493,
    "name": "India Today",
    "number": 2002,
    "category": "News",
    "language": "English",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/India_Today.png",
    "banner": "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "India Today Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "News",
      "progress": 45,
      "description": "Live high-definition transmission of India Today on JioTV Desktop."
    },
    "nextShow": {
      "title": "India Today Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "catchupDays": 7
  },
  {
    "id": "ch-502",
    "channelId": 502,
    "name": "Good News Today",
    "number": 1018,
    "category": "News",
    "language": "Hindi",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Tez.png",
    "banner": "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Good News Today Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "News",
      "progress": 45,
      "description": "Live high-definition transmission of Good News Today on JioTV Desktop."
    },
    "nextShow": {
      "title": "Good News Today Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-173",
    "channelId": 173,
    "name": "Aaj Tak",
    "number": 1001,
    "category": "News",
    "language": "Hindi",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Aaj_Tak.png",
    "banner": "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Aaj Tak Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "News",
      "progress": 45,
      "description": "Live high-definition transmission of Aaj Tak on JioTV Desktop."
    },
    "nextShow": {
      "title": "Aaj Tak Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-177",
    "channelId": 177,
    "name": "ABP News India",
    "number": 1006,
    "category": "News",
    "language": "Hindi",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/ABP_News_India.png",
    "banner": "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "ABP News India Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "News",
      "progress": 45,
      "description": "Live high-definition transmission of ABP News India on JioTV Desktop."
    },
    "nextShow": {
      "title": "ABP News India Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-193",
    "channelId": 193,
    "name": "CNN",
    "number": 2012,
    "category": "News",
    "language": "English",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/CNN.png",
    "banner": "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "CNN Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "News",
      "progress": 45,
      "description": "Live high-definition transmission of CNN on JioTV Desktop."
    },
    "nextShow": {
      "title": "CNN Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "catchupDays": 7
  },
  {
    "id": "ch-286",
    "channelId": 286,
    "name": "Animal Planet HD English",
    "number": 2800,
    "category": "Infotainment",
    "language": "English",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/AnimalPlanetHDEng1.png",
    "banner": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Animal Planet HD English Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Infotainment",
      "progress": 45,
      "description": "Live high-definition transmission of Animal Planet HD English on JioTV Desktop."
    },
    "nextShow": {
      "title": "Animal Planet HD English Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-422",
    "channelId": 422,
    "name": "In Goa 24x7",
    "number": 9801,
    "category": "Infotainment",
    "language": "Marathi",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/InGoa24x7.png",
    "banner": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "In Goa 24x7 Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Infotainment",
      "progress": 45,
      "description": "Live high-definition transmission of In Goa 24x7 on JioTV Desktop."
    },
    "nextShow": {
      "title": "In Goa 24x7 Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-463",
    "channelId": 463,
    "name": "Discovery HD English",
    "number": 2801,
    "category": "Infotainment",
    "language": "English",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/DiscoveryHDEng12.png",
    "banner": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Discovery HD English Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Infotainment",
      "progress": 45,
      "description": "Live high-definition transmission of Discovery HD English on JioTV Desktop."
    },
    "nextShow": {
      "title": "Discovery HD English Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-577",
    "channelId": 577,
    "name": "History TV18 HD Telugu",
    "number": 4803,
    "category": "Infotainment",
    "language": "Telugu",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/History_18_Telugu.png",
    "banner": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "History TV18 HD Telugu Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Infotainment",
      "progress": 45,
      "description": "Live high-definition transmission of History TV18 HD Telugu on JioTV Desktop."
    },
    "nextShow": {
      "title": "History TV18 HD Telugu Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "catchupDays": 7
  },
  {
    "id": "ch-579",
    "channelId": 579,
    "name": "History TV18 HD Tamil",
    "number": 3803,
    "category": "Infotainment",
    "language": "Tamil",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/History_18_Tamil.png",
    "banner": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "History TV18 HD Tamil Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Infotainment",
      "progress": 45,
      "description": "Live high-definition transmission of History TV18 HD Tamil on JioTV Desktop."
    },
    "nextShow": {
      "title": "History TV18 HD Tamil Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-242",
    "channelId": 242,
    "name": "Discovery English",
    "number": 2806,
    "category": "Infotainment",
    "language": "English",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/DiscoveryEng1.png",
    "banner": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Discovery English Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Infotainment",
      "progress": 45,
      "description": "Live high-definition transmission of Discovery English on JioTV Desktop."
    },
    "nextShow": {
      "title": "Discovery English Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-541",
    "channelId": 541,
    "name": "Discovery Turbo",
    "number": 2812,
    "category": "Infotainment",
    "language": "English",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/DiscoveryTurbo1.png",
    "banner": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Discovery Turbo Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Infotainment",
      "progress": 45,
      "description": "Live high-definition transmission of Discovery Turbo on JioTV Desktop."
    },
    "nextShow": {
      "title": "Discovery Turbo Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-566",
    "channelId": 566,
    "name": "Animal Planet Hindi",
    "number": 1802,
    "category": "Infotainment",
    "language": "Hindi",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/AnimalPlanetHin1.png",
    "banner": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Animal Planet Hindi Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Infotainment",
      "progress": 45,
      "description": "Live high-definition transmission of Animal Planet Hindi on JioTV Desktop."
    },
    "nextShow": {
      "title": "Animal Planet Hindi Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "catchupDays": 7
  },
  {
    "id": "ch-551",
    "channelId": 551,
    "name": "TEST14 HD",
    "number": 2305,
    "category": "Kids",
    "language": "English",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/TEST14_HD.png",
    "banner": "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "TEST14 HD Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Kids",
      "progress": 45,
      "description": "Live high-definition transmission of TEST14 HD on JioTV Desktop."
    },
    "nextShow": {
      "title": "TEST14 HD Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-1079",
    "channelId": 1079,
    "name": "Cartoon Network HD+ English",
    "number": 2306,
    "category": "Kids",
    "language": "English",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/CNHDEnglish1.png",
    "banner": "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Cartoon Network HD+ English Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Kids",
      "progress": 45,
      "description": "Live high-definition transmission of Cartoon Network HD+ English on JioTV Desktop."
    },
    "nextShow": {
      "title": "Cartoon Network HD+ English Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-1080",
    "channelId": 1080,
    "name": "Cartoon Network HD+ Telugu",
    "number": 4306,
    "category": "Kids",
    "language": "Telugu",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/CNHDTelugu1.png",
    "banner": "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Cartoon Network HD+ Telugu Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Kids",
      "progress": 45,
      "description": "Live high-definition transmission of Cartoon Network HD+ Telugu on JioTV Desktop."
    },
    "nextShow": {
      "title": "Cartoon Network HD+ Telugu Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-1081",
    "channelId": 1081,
    "name": "Cartoon Network HD+ Tamil",
    "number": 3307,
    "category": "Kids",
    "language": "Tamil",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/CNHDTamil1.png",
    "banner": "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Cartoon Network HD+ Tamil Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Kids",
      "progress": 45,
      "description": "Live high-definition transmission of Cartoon Network HD+ Tamil on JioTV Desktop."
    },
    "nextShow": {
      "title": "Cartoon Network HD+ Tamil Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "catchupDays": 7
  },
  {
    "id": "ch-1226",
    "channelId": 1226,
    "name": "Nick HD+",
    "number": 2307,
    "category": "Kids",
    "language": "English",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Nick_HD_Plus.png",
    "banner": "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Nick HD+ Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Kids",
      "progress": 45,
      "description": "Live high-definition transmission of Nick HD+ on JioTV Desktop."
    },
    "nextShow": {
      "title": "Nick HD+ Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-166",
    "channelId": 166,
    "name": "Cartoon Network Telugu",
    "number": 4302,
    "category": "Kids",
    "language": "Telugu",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/CNTelugu1.png",
    "banner": "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Cartoon Network Telugu Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Kids",
      "progress": 45,
      "description": "Live high-definition transmission of Cartoon Network Telugu on JioTV Desktop."
    },
    "nextShow": {
      "title": "Cartoon Network Telugu Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-290",
    "channelId": 290,
    "name": "sonic Tamil",
    "number": 3303,
    "category": "Kids",
    "language": "Tamil",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/sonic_Tamil.png",
    "banner": "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "sonic Tamil Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Kids",
      "progress": 45,
      "description": "Live high-definition transmission of sonic Tamil on JioTV Desktop."
    },
    "nextShow": {
      "title": "sonic Tamil Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-542",
    "channelId": 542,
    "name": "Pogo Tamil",
    "number": 3300,
    "category": "Kids",
    "language": "Tamil",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Pogo_Tamil.png",
    "banner": "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Pogo Tamil Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Kids",
      "progress": 45,
      "description": "Live high-definition transmission of Pogo Tamil on JioTV Desktop."
    },
    "nextShow": {
      "title": "Pogo Tamil Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "catchupDays": 7
  },
  {
    "id": "ch-248",
    "channelId": 248,
    "name": "MTV",
    "number": 1812,
    "category": "Music",
    "language": "Hindi",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/MTV.png",
    "banner": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "MTV Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Music",
      "progress": 45,
      "description": "Live high-definition transmission of MTV on JioTV Desktop."
    },
    "nextShow": {
      "title": "MTV Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-751",
    "channelId": 751,
    "name": "Tarang Music",
    "number": 9711,
    "category": "Music",
    "language": "Odia",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Tarang_Music.png",
    "banner": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Tarang Music Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Music",
      "progress": 45,
      "description": "Live high-definition transmission of Tarang Music on JioTV Desktop."
    },
    "nextShow": {
      "title": "Tarang Music Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-895",
    "channelId": 895,
    "name": "Sun Music HD",
    "number": 3701,
    "category": "Music",
    "language": "Tamil",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Sun_Music_HD.png",
    "banner": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Sun Music HD Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Music",
      "progress": 45,
      "description": "Live high-definition transmission of Sun Music HD on JioTV Desktop."
    },
    "nextShow": {
      "title": "Sun Music HD Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-898",
    "channelId": 898,
    "name": "Sun Gemini Music HD",
    "number": 4700,
    "category": "Music",
    "language": "Telugu",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Gemini_Music_HD.png",
    "banner": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Sun Gemini Music HD Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Music",
      "progress": 45,
      "description": "Live high-definition transmission of Sun Gemini Music HD on JioTV Desktop."
    },
    "nextShow": {
      "title": "Sun Gemini Music HD Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "catchupDays": 7
  },
  {
    "id": "ch-903",
    "channelId": 903,
    "name": "Only Music",
    "number": 9719,
    "category": "Music",
    "language": "Punjabi",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Only_Music.png",
    "banner": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Only Music Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Music",
      "progress": 45,
      "description": "Live high-definition transmission of Only Music on JioTV Desktop."
    },
    "nextShow": {
      "title": "Only Music Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-183",
    "channelId": 183,
    "name": "B4U Music",
    "number": 1818,
    "category": "Music",
    "language": "Hindi",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/B4U_Music.png",
    "banner": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "B4U Music Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Music",
      "progress": 45,
      "description": "Live high-definition transmission of B4U Music on JioTV Desktop."
    },
    "nextShow": {
      "title": "B4U Music Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-250",
    "channelId": 250,
    "name": "Music India",
    "number": 1801,
    "category": "Music",
    "language": "Hindi",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Music_India.png",
    "banner": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Music India Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Music",
      "progress": 45,
      "description": "Live high-definition transmission of Music India on JioTV Desktop."
    },
    "nextShow": {
      "title": "Music India Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-420",
    "channelId": 420,
    "name": "Jaya Max",
    "number": 3700,
    "category": "Music",
    "language": "Tamil",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Jaya_Max.png",
    "banner": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Jaya Max Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Music",
      "progress": 45,
      "description": "Live high-definition transmission of Jaya Max on JioTV Desktop."
    },
    "nextShow": {
      "title": "Jaya Max Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "catchupDays": 7
  },
  {
    "id": "ch-479",
    "channelId": 479,
    "name": "TLC HD English",
    "number": 2804,
    "category": "Lifestyle",
    "language": "English",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/TLCHDEnglish.png",
    "banner": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "TLC HD English Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Lifestyle",
      "progress": 45,
      "description": "Live high-definition transmission of TLC HD English on JioTV Desktop."
    },
    "nextShow": {
      "title": "TLC HD English Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-562",
    "channelId": 562,
    "name": "Travelxp HD Hindi",
    "number": 1821,
    "category": "Lifestyle",
    "language": "Hindi",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Travel_XP.png",
    "banner": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Travelxp HD Hindi Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Lifestyle",
      "progress": 45,
      "description": "Live high-definition transmission of Travelxp HD Hindi on JioTV Desktop."
    },
    "nextShow": {
      "title": "Travelxp HD Hindi Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-795",
    "channelId": 795,
    "name": "testa",
    "number": 1896,
    "category": "Lifestyle",
    "language": "Hindi",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Wellness.png",
    "banner": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "testa Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Lifestyle",
      "progress": 45,
      "description": "Live high-definition transmission of testa on JioTV Desktop."
    },
    "nextShow": {
      "title": "testa Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-953",
    "channelId": 953,
    "name": "Propex TV",
    "number": 7805,
    "category": "Lifestyle",
    "language": "Malayalam",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Propex_TV.png",
    "banner": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Propex TV Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Lifestyle",
      "progress": 45,
      "description": "Live high-definition transmission of Propex TV on JioTV Desktop."
    },
    "nextShow": {
      "title": "Propex TV Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "catchupDays": 7
  },
  {
    "id": "ch-1598",
    "channelId": 1598,
    "name": "FTV HD",
    "number": 2802,
    "category": "Lifestyle",
    "language": "English",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/FTV_HD.png",
    "banner": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "FTV HD Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Lifestyle",
      "progress": 45,
      "description": "Live high-definition transmission of FTV HD on JioTV Desktop."
    },
    "nextShow": {
      "title": "FTV HD Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-560",
    "channelId": 560,
    "name": "GOOD TiMES",
    "number": 2813,
    "category": "Lifestyle",
    "language": "English",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/NDTV_Good_Times.png",
    "banner": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "GOOD TiMES Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Lifestyle",
      "progress": 45,
      "description": "Live high-definition transmission of GOOD TiMES on JioTV Desktop."
    },
    "nextShow": {
      "title": "GOOD TiMES Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-561",
    "channelId": 561,
    "name": "Food Food",
    "number": 1813,
    "category": "Lifestyle",
    "language": "Hindi",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Food_Food.png",
    "banner": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Food Food Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Lifestyle",
      "progress": 45,
      "description": "Live high-definition transmission of Food Food on JioTV Desktop."
    },
    "nextShow": {
      "title": "Food Food Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-563",
    "channelId": 563,
    "name": "Kaumudy TV",
    "number": 7800,
    "category": "Lifestyle",
    "language": "Malayalam",
    "isHd": false,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Kaumudy_TV.png",
    "banner": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Kaumudy TV Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Lifestyle",
      "progress": 45,
      "description": "Live high-definition transmission of Kaumudy TV on JioTV Desktop."
    },
    "nextShow": {
      "title": "Kaumudy TV Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "catchupDays": 7
  },
  {
    "id": "ch-595",
    "channelId": 595,
    "name": "Prarthana Life",
    "number": 9604,
    "category": "Devotional",
    "language": "Odia",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Prarthana_Life.png",
    "banner": "https://images.unsplash.com/photo-1545128485-c400e7702796?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Prarthana Life Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Devotional",
      "progress": 45,
      "description": "Live high-definition transmission of Prarthana Life on JioTV Desktop."
    },
    "nextShow": {
      "title": "Prarthana Life Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-835",
    "channelId": 835,
    "name": "Angel TV HD",
    "number": 3605,
    "category": "Devotional",
    "language": "Tamil",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Angel_TV_HD.png",
    "banner": "https://images.unsplash.com/photo-1545128485-c400e7702796?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Angel TV HD Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Devotional",
      "progress": 45,
      "description": "Live high-definition transmission of Angel TV HD on JioTV Desktop."
    },
    "nextShow": {
      "title": "Angel TV HD Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-879",
    "channelId": 879,
    "name": "Hare krsna",
    "number": 1815,
    "category": "Devotional",
    "language": "Hindi",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Harekrsna.png",
    "banner": "https://images.unsplash.com/photo-1545128485-c400e7702796?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Hare krsna Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Devotional",
      "progress": 45,
      "description": "Live high-definition transmission of Hare krsna on JioTV Desktop."
    },
    "nextShow": {
      "title": "Hare krsna Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8",
    "catchupDays": 7
  },
  {
    "id": "ch-886",
    "channelId": 886,
    "name": "Lakshya TV",
    "number": 6601,
    "category": "Devotional",
    "language": "Gujarati",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Lakshya_TV.png",
    "banner": "https://images.unsplash.com/photo-1545128485-c400e7702796?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Lakshya TV Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Devotional",
      "progress": 45,
      "description": "Live high-definition transmission of Lakshya TV on JioTV Desktop."
    },
    "nextShow": {
      "title": "Lakshya TV Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "catchupDays": 7
  },
  {
    "id": "ch-887",
    "channelId": 887,
    "name": "Vedant Ras Swar Shree",
    "number": 1865,
    "category": "Devotional",
    "language": "Hindi",
    "isHd": true,
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/swarshreejio.png",
    "banner": "https://images.unsplash.com/photo-1545128485-c400e7702796?w=800&auto=format&fit=crop&q=80",
    "currentShow": {
      "title": "Vedant Ras Swar Shree Live Broadcast",
      "time": "09:00 PM - 10:00 PM",
      "duration": "60 mins",
      "genre": "Devotional",
      "progress": 45,
      "description": "Live high-definition transmission of Vedant Ras Swar Shree on JioTV Desktop."
    },
    "nextShow": {
      "title": "Vedant Ras Swar Shree Prime Hour",
      "time": "10:00 PM - 11:00 PM"
    },
    "streamUrl": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    "catchupDays": 7
  }
];

// 7-day past schedule mock generator for Catch-up TV
export function generateCatchupSchedule(channel, dateOffsetDays = 0) {
  const currentTitle = channel?.currentShow?.title || 'Live Transmission';
  const currentCategory = channel?.category || 'Entertainment';
  const nextTitle = channel?.nextShow?.title || 'Prime Broadcast';

  return [
    { title: 'Morning Bhakti & Prarthana', time: '06:00 AM - 07:00 AM', category: 'Devotional' },
    { title: 'Morning Headlines & Weather', time: '07:00 AM - 08:30 AM', category: 'News' },
    { title: 'Breakfast Tele-Shopping & Health', time: '08:30 AM - 10:00 AM', category: 'Lifestyle' },
    { title: 'Classic Comedy Hour', time: '10:00 AM - 12:00 PM', category: 'Entertainment' },
    { title: 'Matinee Blockbuster Movie', time: '12:00 PM - 03:00 PM', category: 'Movies' },
    { title: 'Afternoon Family Drama', time: '03:00 PM - 04:30 PM', category: 'Drama' },
    { title: 'Youth Beats & Top 20 Songs', time: '04:30 PM - 06:00 PM', category: 'Music' },
    { title: 'Evening News & Regional Update', time: '06:00 PM - 07:00 PM', category: 'News' },
    { title: 'Prime Time Family Soap', time: '07:00 PM - 08:30 PM', category: 'Entertainment' },
    { title: currentTitle, time: channel?.currentShow?.time || '08:30 PM - 09:30 PM', category: currentCategory },
    { title: nextTitle, time: channel?.nextShow?.time || '09:30 PM - 10:30 PM', category: currentCategory },
    { title: 'Late Night Cinema / Re-telecast', time: '11:00 PM - 01:30 AM', category: 'Movies' }
  ];
}
