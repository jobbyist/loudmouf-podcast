/**
 * THE BIG MOOD SERIES — Episode Data
 * ------------------------------------------------------------
 * This is the ONLY file most people need to touch to publish a
 * new episode. No build step, no framework — just edit this
 * array and push to GitHub.
 *
 * HOW TO ADD A NEW EPISODE
 * 1. Drop the audio file into /audio  (e.g. episode-11.mp3)
 * 2. Optional: drop cover art into /images/covers (e.g. ep-11.jpg)
 * 3. Copy one of the objects below, paste it at the END of the
 *    array (or wherever you want it in the list order), and
 *    update the fields.
 * 4. Commit + push. GitHub Pages redeploys automatically.
 *
 * FIELD NOTES
 * - id:        unique slug, used in the URL hash (#ep-01)
 * - number:    episode number shown as "01", "02" etc.
 * - title:     episode title (before the colon)
 * - subtitle:  the part after the colon in the season list
 * - synopsis:  1–2 sentence teaser shown on the episode card
 * - guest:     guest name, or "" if solo/host-led
 * - duration:  "MM:SS" runtime — update once the file is final
 * - date:      release date "YYYY-MM-DD", or "" if unreleased
 * - audio:     path to the mp3 in /audio — "" if not uploaded yet
 * - cover:     path to cover art in /images/covers — optional,
 *              falls back to the generated gradient number tile
 * - explicit:  true/false — shown as an [E] badge
 */

window.BIG_MOOD_EPISODES = [
  {
    id: "ep-01",
    number: "01",
    title: "The Green Rush",
    subtitle: "Building the Future of Cannabis in SA",
    synopsis: "South Africa's cannabis economy is being built right now. We map the players, the money and the openings nobody's talking about yet.",
    guest: "",
    duration: "00:00",
    date: "",
    audio: "" /* set to "audio/episode-01.mp3" once uploaded */,
    cover: "",
    explicit: false
  },
  {
    id: "ep-02",
    number: "02",
    title: "High Culture",
    subtitle: "Weed, Art & The New Creative Economy",
    synopsis: "From studio sessions to gallery walls — how cannabis is quietly funding and fuelling a new wave of South African creativity.",
    guest: "",
    duration: "00:00",
    date: "",
    audio: "" /* set to "audio/episode-02.mp3" once uploaded */,
    cover: "",
    explicit: false
  },
  {
    id: "ep-03",
    number: "03",
    title: "From Plug to CEO",
    subtitle: "Stories of the New Cannabis Wave",
    synopsis: "The people who moved from informal supply to registered enterprise, and what it actually took to make that jump legit.",
    guest: "",
    duration: "00:00",
    date: "",
    audio: "" /* set to "audio/episode-03.mp3" once uploaded */,
    cover: "",
    explicit: false
  },
  {
    id: "ep-04",
    number: "04",
    title: "Women In Weed",
    subtitle: "Leading Loud & Proud",
    synopsis: "The founders, growers and educators leading South Africa's cannabis industry — and why the room is finally starting to look different.",
    guest: "",
    duration: "00:00",
    date: "",
    audio: "" /* set to "audio/episode-04.mp3" once uploaded */,
    cover: "",
    explicit: false
  },
  {
    id: "ep-05",
    number: "05",
    title: "The Science of High",
    subtitle: "Terpenes, Entourage & You",
    synopsis: "A plain-English breakdown of terpenes and the entourage effect — the science behind why every strain hits differently.",
    guest: "",
    duration: "00:00",
    date: "",
    audio: "" /* set to "audio/episode-05.mp3" once uploaded */,
    cover: "",
    explicit: false
  },
  {
    id: "ep-06",
    number: "06",
    title: "Smoking Mirrors",
    subtitle: "Busting Cannabis Myths in 2025",
    synopsis: "We put the internet's favourite weed myths on trial — what's true, what's outdated, and what was never real to begin with.",
    guest: "",
    duration: "00:00",
    date: "",
    audio: "" /* set to "audio/episode-06.mp3" once uploaded */,
    cover: "",
    explicit: false
  },
  {
    id: "ep-07",
    number: "07",
    title: "Legalize It Right",
    subtitle: "Policy, Politics & Progress",
    synopsis: "Where South African cannabis law actually stands today, what's still stuck in Parliament, and who's fighting to move it.",
    guest: "",
    duration: "00:00",
    date: "",
    audio: "" /* set to "audio/episode-07.mp3" once uploaded */,
    cover: "",
    explicit: false
  },
  {
    id: "ep-08",
    number: "08",
    title: "Weed & Wellness",
    subtitle: "Healing Beyond The High",
    synopsis: "Sleep, pain, anxiety, focus — the wellness use cases driving a quieter, more clinical side of cannabis culture.",
    guest: "",
    duration: "00:00",
    date: "",
    audio: "" /* set to "audio/episode-08.mp3" once uploaded */,
    cover: "",
    explicit: false
  },
  {
    id: "ep-09",
    number: "09",
    title: "Global Loud Pack",
    subtitle: "What the World Can Learn from SA",
    synopsis: "South Africa versus the world — how local cannabis culture compares, and where it's actually setting the pace.",
    guest: "",
    duration: "00:00",
    date: "",
    audio: "" /* set to "audio/episode-09.mp3" once uploaded */,
    cover: "",
    explicit: false
  },
  {
    id: "ep-10",
    number: "10",
    title: "Next Gen Stoners",
    subtitle: "Gen Z, Cannabis & Culture",
    synopsis: "How the youngest generation of consumers is rewriting the rules — different habits, different values, same plant.",
    guest: "",
    duration: "00:00",
    date: "",
    audio: "" /* set to "audio/episode-10.mp3" once uploaded */,
    cover: "",
    explicit: false
  }
];
