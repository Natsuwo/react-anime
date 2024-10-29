import { serverTimestamp } from "firebase/firestore";

const DataEpisode = [
  {
    title: "5 Minutes Trailer",
    video_id: "6SGdLQObVzdxhBr4KAah",
    type: "Trailer",
    season: 1,
    episode_num: 1,
    description: `The story is set in the 15th century Kingdom of P. Rafał, a child prodigy, is allowed to skip a grade and enter university. In response to the expectations of those around him, he declares that he will major in theology, which was considered the most important subject at the time. However, he is unable to abandon his passion for astronomy, which he has been passionate about for a long time. One day, he meets a mysterious scholar named Hubert. Hubert was tortured and imprisoned for touching upon a taboo based on heretical thought. The scholar he was researching was a shocking "hypothesis" about the universe.`,
    duration: 300,
    privacy_status: "public",
    thumbnail_url: "https://img.youtube.com/vi/yBVJEJOK6tA/sddefault.jpg",
    last_modified_date: serverTimestamp(),
    upload_date: serverTimestamp(),
    video_id: "video01",
    video_url: "https://files.catbox.moe/pvgrbu.mp4",
    views_count: 80000,
    like_count: 102,
    dislikes_count: 0,
  },
];

export default DataEpisode;
