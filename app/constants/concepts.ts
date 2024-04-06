export const CONCEPTS = [
  {
    topic: "The Weather",
    description:
      "Discussing the current weather conditions, upcoming forecasts, and how it affects plans.",
  },
  {
    topic: "Weekend Plans",
    description:
      "Sharing what you're planning to do or what you did over the weekend.",
  },
  {
    topic: "Food and Cooking",
    description:
      "Talking about favorite foods, recent meals you've cooked, or new recipes you want to try.",
  },
  {
    topic: "Work or School",
    description:
      "Sharing updates, achievements, or challenges related to work or school.",
  },
  {
    topic: "Movies and TV Shows",
    description:
      "Discussing recent movies or TV shows you've watched and recommending them to others.",
  },
  {
    topic: "Books and Reading",
    description:
      "Sharing about books you're reading, book recommendations, and favorite genres.",
  },
  {
    topic: "Hobbies and Interests",
    description:
      "Talking about your hobbies, how you spend your free time, and trying new activities.",
  },
  {
    topic: "Travel and Vacations",
    description:
      "Sharing experiences from past trips, dream destinations, or upcoming travel plans.",
  },
  {
    topic: "Fitness and Health",
    description:
      "Discussing workout routines, health tips, and personal fitness goals.",
  },
  {
    topic: "Current Events",
    description:
      "Sharing thoughts on recent news stories, global events, and their implications.",
  },
  {
    topic: "Music and Concerts",
    description:
      "Talking about favorite artists, recent concerts attended, or new music releases.",
  },
  {
    topic: "Technology and Gadgets",
    description:
      "Discussing the latest tech developments, gadgets you own, or wish to buy.",
  },
  {
    topic: "Fashion and Style",
    description:
      "Sharing your personal style, recent purchases, or fashion trends you're following.",
  },
  {
    topic: "Sports and Games",
    description:
      "Discussing favorite sports to watch or play, recent games, and supporting teams.",
  },
  {
    topic: "Personal Goals",
    description:
      "Sharing your goals, aspirations, and steps you're taking to achieve them.",
  },
  {
    topic: "Family and Friends",
    description:
      "Sharing stories about family members, friends, and significant others.",
  },
  {
    topic: "Pets and Animals",
    description:
      "Talking about pets you have, their quirks, or interesting animal facts.",
  },
  {
    topic: "Social Media and Internet",
    description:
      "Discussing what you've seen on social media, viral trends, or online communities.",
  },
  {
    topic: "Art and Creativity",
    description:
      "Sharing your creative projects, visits to museums, or artistic interests.",
  },
  {
    topic: "Festivals and Events",
    description:
      "Talking about local festivals, concerts, or events you're excited about or have attended.",
  },
];

export const getRandomConcept = () => {
  const randomIndex = Math.floor(Math.random() * CONCEPTS.length);
  return CONCEPTS[randomIndex];
};
