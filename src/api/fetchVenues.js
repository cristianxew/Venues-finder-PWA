const clientId = "PYUXWXAJSC3PJ0EL3NFTPG4SYZBBIK1IVTSIZWL0GUVNR4J1";
const clientSecret = "OUQYTVQ3F2K55QDVL5IKSMO5OBOM114VON02SHJMMEJ2OZRN";
const url = "https://api.foursquare.com/v2/venues/explore?ll=";

export const fetchVenues = async (query) => {
  const city = query.replace(/\s+/g, "");
  const urlToFeth = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&section=topPicks&sortByPopularity=1&v=20200617`;
  try {
    const response = await fetch(urlToFeth);
    if (response.ok) {
      const jsonResponse = await response.json();
      const venues = jsonResponse.response.groups[0].items.map(
        (item) => item.venue
      );
      console.log(venues);
      return venues;
    }
  } catch (error) {
    console.log(error, "algo paso error");
  }
};
