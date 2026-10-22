// JioTV Channel Database with Multi-Genre, Multi-Language & Live EPG Data

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
  'Educational'
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
  'Punjabi'
];

// Sample reliable HLS public streams (BBC, Red Bull TV, Bloomberg, Apple HLS, Tears of Steel, etc.)
const SAMPLE_STREAMS = [
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8',
  'https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
];

export const CHANNELS = [
  {
    id: 'star-plus',
    name: 'Star Plus HD',
    number: 101,
    category: 'Entertainment',
    language: 'Hindi',
    isHd: true,
    logo: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&auto=format&fit=crop&q=80',
    currentShow: {
      title: 'Anupamaa',
      time: '09:00 PM - 09:30 PM',
      duration: '30 mins',
      genre: 'Drama / Family',
      progress: 65,
      description: 'Anupamaa stands resilient against adversity as unforeseen family developments create new dilemmas.'
    },
    nextShow: {
      title: 'Yeh Rishta Kya Kehlata Hai',
      time: '09:30 PM - 10:00 PM'
    },
    streamUrl: SAMPLE_STREAMS[0],
    catchupDays: 7
  },
  {
    id: 'colors-tv',
    name: 'Colors HD',
    number: 102,
    category: 'Entertainment',
    language: 'Hindi',
    isHd: true,
    logo: 'https://images.unsplash.com/photo-1578022761797-b8636ac1773c?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    currentShow: {
      title: 'Bigg Boss 18 - Weekend Ka Vaar',
      time: '09:00 PM - 10:30 PM',
      duration: '90 mins',
      genre: 'Reality / Entertainment',
      progress: 40,
      description: 'Salman Khan reviews contestants performances, delivers eviction surprises, and confronts the housemates.'
    },
    nextShow: {
      title: 'Parineetii',
      time: '10:30 PM - 11:00 PM'
    },
    streamUrl: SAMPLE_STREAMS[1],
    catchupDays: 7
  },
  {
    id: 'sony-set',
    name: 'Sony Entertainment TV HD',
    number: 103,
    category: 'Entertainment',
    language: 'Hindi',
    isHd: true,
    logo: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
    currentShow: {
      title: 'Kaun Banega Crorepati',
      time: '09:00 PM - 10:30 PM',
      duration: '90 mins',
      genre: 'Game Show',
      progress: 50,
      description: 'Amitabh Bachchan hosts eager contestants aspiring to win a jackpot with quick wits and general knowledge.'
    },
    nextShow: {
      title: 'The Kapil Sharma Show Classics',
      time: '10:30 PM - 11:30 PM'
    },
    streamUrl: SAMPLE_STREAMS[2],
    catchupDays: 7
  },
  {
    id: 'star-sports-1',
    name: 'Star Sports 1 HD',
    number: 201,
    category: 'Sports',
    language: 'Hindi',
    isHd: true,
    logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80',
    currentShow: {
      title: 'India Tour of Australia - Live Cricket',
      time: '08:00 PM - 11:00 PM',
      duration: '180 mins',
      genre: 'Cricket / Live Action',
      progress: 75,
      description: 'High stakes Border-Gavaskar Trophy encounter featuring premier pace duels and legendary innings.'
    },
    nextShow: {
      title: 'Match Point & Post Show Highlights',
      time: '11:00 PM - 11:45 PM'
    },
    streamUrl: SAMPLE_STREAMS[0],
    catchupDays: 7
  },
  {
    id: 'sports18-1',
    name: 'Sports18 1 HD',
    number: 202,
    category: 'Sports',
    language: 'English',
    isHd: true,
    logo: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80',
    currentShow: {
      title: 'UEFA Champions League Matchnight',
      time: '08:30 PM - 10:45 PM',
      duration: '135 mins',
      genre: 'Football / Soccer',
      progress: 30,
      description: 'European elite battle on the grandest stage with live tactical commentary and analysis.'
    },
    nextShow: {
      title: 'ISL Highlights & Weekly Roundup',
      time: '10:45 PM - 11:30 PM'
    },
    streamUrl: SAMPLE_STREAMS[1],
    catchupDays: 7
  },
  {
    id: 'aaj-tak',
    name: 'Aaj Tak HD',
    number: 301,
    category: 'News',
    language: 'Hindi',
    isHd: true,
    logo: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=80',
    currentShow: {
      title: 'Dangal Prime Time Debate',
      time: '09:00 PM - 10:00 PM',
      duration: '60 mins',
      genre: 'News / Current Affairs',
      progress: 60,
      description: 'Heated political analysis with leading spokespersons addressing national headlines.'
    },
    nextShow: {
      title: 'Khabardar Tonight',
      time: '10:00 PM - 11:00 PM'
    },
    streamUrl: SAMPLE_STREAMS[2],
    catchupDays: 7
  },
  {
    id: 'ndtv-24x7',
    name: 'NDTV 24x7',
    number: 302,
    category: 'News',
    language: 'English',
    isHd: false,
    logo: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    currentShow: {
      title: 'Left, Right & Centre',
      time: '09:00 PM - 10:00 PM',
      duration: '60 mins',
      genre: 'Analysis & Opinions',
      progress: 45,
      description: 'In-depth non-partisan panel discussions exploring economy, geopolitics and governance.'
    },
    nextShow: {
      title: 'Prime Time World News',
      time: '10:00 PM - 10:30 PM'
    },
    streamUrl: SAMPLE_STREAMS[0],
    catchupDays: 7
  },
  {
    id: 'zee-cinema',
    name: 'Zee Cinema HD',
    number: 401,
    category: 'Movies',
    language: 'Hindi',
    isHd: true,
    logo: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
    currentShow: {
      title: 'Jawan (Blockbuster Movie)',
      time: '08:00 PM - 11:15 PM',
      duration: '195 mins',
      genre: 'Action / Thriller',
      progress: 55,
      description: 'Shah Rukh Khan in a gripping vigilante action epic navigating justice, power, and sacrifice.'
    },
    nextShow: {
      title: 'Gadar 2',
      time: '11:15 PM - 02:00 AM'
    },
    streamUrl: SAMPLE_STREAMS[1],
    catchupDays: 7
  },
  {
    id: 'star-gold',
    name: 'Star Gold HD',
    number: 402,
    category: 'Movies',
    language: 'Hindi',
    isHd: true,
    logo: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=800&auto=format&fit=crop&q=80',
    currentShow: {
      title: 'Brahmāstra: Part One – Shiva',
      time: '08:30 PM - 11:30 PM',
      duration: '180 mins',
      genre: 'Fantasy / Adventure',
      progress: 35,
      description: 'Shiva discovers his connection to the element of fire and wields the Brahmāstra weapon.'
    },
    nextShow: {
      title: 'Singham Returns',
      time: '11:30 PM - 02:00 AM'
    },
    streamUrl: SAMPLE_STREAMS[2],
    catchupDays: 7
  },
  {
    id: 'mtv-india',
    name: 'MTV HD+',
    number: 501,
    category: 'Music',
    language: 'Hindi',
    isHd: true,
    logo: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
    currentShow: {
      title: 'MTV Hustle 03 - Rap Battles',
      time: '09:00 PM - 10:00 PM',
      duration: '60 mins',
      genre: 'Hip Hop / Reality',
      progress: 80,
      description: 'Raw lyrical talent battles out in high-octane hip-hop performances judged by India top artists.'
    },
    nextShow: {
      title: 'MTV Roadies Karm Ya Kaand',
      time: '10:00 PM - 11:00 PM'
    },
    streamUrl: SAMPLE_STREAMS[0],
    catchupDays: 7
  },
  {
    id: 'cartoon-network',
    name: 'Cartoon Network HD+',
    number: 601,
    category: 'Kids',
    language: 'Hindi',
    isHd: true,
    logo: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80',
    currentShow: {
      title: 'Ben 10: Ultimate Alien',
      time: '09:00 PM - 09:30 PM',
      duration: '30 mins',
      genre: 'Animated / Sci-Fi',
      progress: 70,
      description: 'Ben Tennyson faces extraterrestrial threats with the Omnitrix and newly mastered alien heroes.'
    },
    nextShow: {
      title: 'Tom and Jerry Classic Marathon',
      time: '09:30 PM - 10:30 PM'
    },
    streamUrl: SAMPLE_STREAMS[1],
    catchupDays: 7
  },
  {
    id: 'discovery-hd',
    name: 'Discovery HD World',
    number: 701,
    category: 'Infotainment',
    language: 'English',
    isHd: true,
    logo: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    currentShow: {
      title: 'Man vs Wild: Deep Survival',
      time: '09:00 PM - 10:00 PM',
      duration: '60 mins',
      genre: 'Survival / Nature',
      progress: 45,
      description: 'Bear Grylls tackles hazardous terrain across unforgiving wilderness to uncover primal survival strategies.'
    },
    nextShow: {
      title: 'Deadliest Catch',
      time: '10:00 PM - 11:00 PM'
    },
    streamUrl: SAMPLE_STREAMS[2],
    catchupDays: 7
  },
  {
    id: 'nat-geo',
    name: 'National Geographic HD',
    number: 702,
    category: 'Infotainment',
    language: 'English',
    isHd: true,
    logo: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80',
    currentShow: {
      title: 'Secret Life of Predators',
      time: '09:00 PM - 10:00 PM',
      duration: '60 mins',
      genre: 'Wildlife / Documentary',
      progress: 60,
      description: 'Stunning high-definition footage detailing the subtle instincts and hunting precision of big cats.'
    },
    nextShow: {
      title: 'Cosmos: Possible Worlds',
      time: '10:00 PM - 11:00 PM'
    },
    streamUrl: SAMPLE_STREAMS[0],
    catchupDays: 7
  },
  {
    id: 'sanskar-tv',
    name: 'Sanskar TV',
    number: 801,
    category: 'Devotional',
    language: 'Hindi',
    isHd: false,
    logo: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&auto=format&fit=crop&q=80',
    currentShow: {
      title: 'Shri Ram Katha & Evening Aarti',
      time: '08:30 PM - 10:00 PM',
      duration: '90 mins',
      genre: 'Spiritual / Bhajan',
      progress: 50,
      description: 'Spiritual discourse featuring divine bhajans, evening prayers and wisdom from the Ramayana.'
    },
    nextShow: {
      title: 'Bhajan Sandhya',
      time: '10:00 PM - 11:00 PM'
    },
    streamUrl: SAMPLE_STREAMS[1],
    catchupDays: 7
  },
  {
    id: 'sun-tv',
    name: 'Sun TV HD',
    number: 901,
    category: 'Entertainment',
    language: 'Tamil',
    isHd: true,
    logo: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
    currentShow: {
      title: 'Kayal (Mega Serial)',
      time: '09:00 PM - 09:30 PM',
      duration: '30 mins',
      genre: 'Drama',
      progress: 70,
      description: 'Kayal navigates difficult familial responsibilities with sheer willpower and love.'
    },
    nextShow: {
      title: 'Singapenne',
      time: '09:30 PM - 10:00 PM'
    },
    streamUrl: SAMPLE_STREAMS[2],
    catchupDays: 7
  },
  {
    id: 'star-maa',
    name: 'Star Maa HD',
    number: 902,
    category: 'Entertainment',
    language: 'Telugu',
    isHd: true,
    logo: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
    currentShow: {
      title: 'Karthika Deepam 2',
      time: '09:00 PM - 09:30 PM',
      duration: '30 mins',
      genre: 'Drama',
      progress: 60,
      description: 'Deepa battles emotional complexities while raising her daughter against family prejudice.'
    },
    nextShow: {
      title: 'Brahmamudi',
      time: '09:30 PM - 10:00 PM'
    },
    streamUrl: SAMPLE_STREAMS[0],
    catchupDays: 7
  },
  {
    id: 'zee-bangla',
    name: 'Zee Bangla HD',
    number: 903,
    category: 'Entertainment',
    language: 'Bengali',
    isHd: true,
    logo: 'https://images.unsplash.com/photo-1578022761797-b8636ac1773c?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    currentShow: {
      title: 'Mithijhora',
      time: '09:00 PM - 09:30 PM',
      duration: '30 mins',
      genre: 'Drama',
      progress: 40,
      description: 'A touching family drama about sisterhood, sacrifice, and modern dreams in Kolkata.'
    },
    nextShow: {
      title: 'Neem Phuler Madhu',
      time: '09:30 PM - 10:00 PM'
    },
    streamUrl: SAMPLE_STREAMS[1],
    catchupDays: 7
  },
  {
    id: 'zee-marathi',
    name: 'Zee Marathi HD',
    number: 904,
    category: 'Entertainment',
    language: 'Marathi',
    isHd: true,
    logo: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&auto=format&fit=crop&q=80',
    currentShow: {
      title: 'Chala Hawa Yeu Dya',
      time: '09:00 PM - 10:00 PM',
      duration: '60 mins',
      genre: 'Comedy / Talk Show',
      progress: 55,
      description: 'Maharashtra favourite comedy troupe ribs celebrity guests with rib-tickling skits.'
    },
    nextShow: {
      title: 'Tula Shikvin Changlach Dhada',
      time: '10:00 PM - 10:30 PM'
    },
    streamUrl: SAMPLE_STREAMS[2],
    catchupDays: 7
  }
];

// 7-day past schedule mock generator for Catch-up TV
export function generateCatchupSchedule(channel, dateOffsetDays = 0) {
  const shows = [
    { title: 'Morning Bhakti & Prarthana', time: '06:00 AM - 07:00 AM', category: 'Devotional' },
    { title: 'Morning Headlines & Weather', time: '07:00 AM - 08:30 AM', category: 'News' },
    { title: 'Breakfast Tele-Shopping & Health', time: '08:30 AM - 10:00 AM', category: 'Lifestyle' },
    { title: 'Classic Comedy Hour', time: '10:00 AM - 12:00 PM', category: 'Entertainment' },
    { title: 'Matinee Blockbuster Movie', time: '12:00 PM - 03:00 PM', category: 'Movies' },
    { title: 'Afternoon Family Drama', time: '03:00 PM - 04:30 PM', category: 'Drama' },
    { title: 'Youth Beats & Top 20 Songs', time: '04:30 PM - 06:00 PM', category: 'Music' },
    { title: 'Evening News & Regional Update', time: '06:00 PM - 07:00 PM', category: 'News' },
    { title: 'Prime Time Family Soap', time: '07:00 PM - 08:30 PM', category: 'Entertainment' },
    { title: channel.currentShow.title, time: channel.currentShow.time, category: channel.category },
    { title: channel.nextShow.title, time: channel.nextShow.time, category: channel.category },
    { title: 'Late Night Cinema / Re-telecast', time: '11:00 PM - 01:30 AM', category: 'Movies' }
  ];
  return shows;
}
