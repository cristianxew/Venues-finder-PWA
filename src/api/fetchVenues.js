import axios from "axios";

const clientId = "PYUXWXAJSC3PJ0EL3NFTPG4SYZBBIK1IVTSIZWL0GUVNR4J1";
const clientSecret = "OUQYTVQ3F2K55QDVL5IKSMO5OBOM114VON02SHJMMEJ2OZRN";
const url = "https://api.foursquare.com/v2/venues/explore?";

export const fetchVenues = async (query, section) => {
  const location = query.replace(/\s+/g, "");
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const date = yyyy + mm + dd;
  const v = date;

  const { data } = await axios.get(url, {
    params: {
      ll: location,
      limit: 30,
      client_id: clientId,
      client_secret: clientSecret,
      section: section,
      radius: 14000,
      v: v,
    },
  });
  const venues = data.response.groups[0].items.map((item) => item.venue);
  return venues;
};
