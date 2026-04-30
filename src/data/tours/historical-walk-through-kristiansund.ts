import type { Tour } from "./types";

const tour: Tour = {
  id: "historical-walk-through-kristiansund",
  title: {
    no: "Historisk vandring i Kristiansund",
    en: "Historical walk through Kristiansund"
  },
  subtitle: {
    no: "Løypa viser Kristiansunds utvikling som kystby, med klippfisk, handel og gjenoppbygging etter krigen.",
    en: "The route shows Kristiansund's development as a coastal town, with stockfish, trade, and reconstruction after the war."
  },
  description: {
    no: "Denne løypa viser hvordan Kristiansund har utviklet seg som kystby. Turistene får læres om klippfisk, handel og hvordan byen ble gjenoppbygd etter andres verdenskrig. Underveis opplever de både historie, kultur og natur.",
    en: "This route shows how Kristiansund has developed as a coastal town. Tourists learn about stockfish, trade, and how the town was rebuilt after the Second World War. Along the way, they experience history, culture, and nature."
  },
  howItWorks: {
    no: "1. Starter ved Kristiansund havn, hvor de fleste turistene ankommer.\n2. Herfra går turen gjennom sentrum med flere stopp som forteller om byens historie.\n3. Et av høydepunktene er Varden utsiktspunkt, hvor man får god utsikt over øyene og havet rundt byen.\n4. Turen avluttes ved Gripruta kai, som viser forbindelsen mellom byen og kysten.",
    en: "1. Starts at Kristiansund harbor, where most tourists arrive.\n2. From there, the route goes through the city center with several stops that tell the story of the town's history.\n3. One of the highlights is the Varden viewpoint, where you get a great view of the islands and the surrounding sea.\n4. The tour ends at the Gripruta quay, which shows the connection between the town and the coast."
  },
  estimatedTime: {
    no: "Ca. 1,5-2 timer",
    en: "Around 1,5-2 hours"
  },
  distance: "4 km",
  difficulty: "moderat",
  coverImage: "https://cdn.discordapp.com/attachments/1010516590321729536/1498956923364442234/IMG_0598.png?ex=69f30beb&is=69f1ba6b&hm=e4334f0b4dcfc4822226d5b39c0529d247f16e51796a7b3876fd8b1b800fc45a&",
  mapCenter: { lat: 63.111, lng: 7.729 },
  mapZoom: 15,
  stops: [
    {
      id: "kristiansund-havn",
      order: 1,
      title: {
        no: "Kristiansund havn",
        en: "Kristiansund harbor"
      },
      description: {
        no: "Kristiansund har i lang tid vært en viktig kystby i Norge. Byen består av flere øyer, og havna har vært sentrum for handel, fiske og transport. I dag er havna et viktig stopp for cruiseturister som ønsker å oppleve norsk kystkultur.\nNår du står her, er du midt i hjertet av byen. Båter, sjø og vær har alltid preget livet i Kristiansund. Byen ble nesten helt ødelagt under andre verdenskrig, men ble bygget opp igjen etterpå.\nDenne løypa tar deg gjennom både historie og natur, og gir et innblikk i hvordan livet ved kysten har vært og fortsatt er.",
        en: "Kristiansund has long been an important coastal town in Norway. The town consists of several islands, and the harbor has been a center for trade, fishing, and transport. Today, the harbor is an important stop for cruise tourists who want to experience Norwegian coastal culture.\nAs you stand here, you are in the heart of the town. Boats, the sea, and the weather have always shaped life in Kristiansund. The town was almost completely destroyed during the Second World War but was rebuilt afterward.\nThis route takes you through both history and nature, offering insight into what life by the coast has been like and still is today."
      },
      images: [],
      lat: 63.111,
      lng: 7.729,
      locationHint: {
        no: "Nær den nye campus på kaia",
        en: "Near the new campus on the docks"
      }
    },
    {
      id: "klippfiskkjerringa",
      order: 2,
      title: {
        no: "Klippfiskkjerringa",
        en: "Clip fish lady"
      },
      description: {
        no: "Denne statuen viser ei kvinne som arbeider med klippfisk, en av de viktigste næringene i Kristiansund gjennom historien. Klippfisk er tørket og saltet fisk som ble eksportert til land som Portugal og Spania.\nArbeidet med klippfisk var tungt og krevde mye manuelt arbeid. Mange kvinner jobbet med å legge fisken ut til tørk på svabergene langs kysten.\nKlippfisken gjorde Kristiansund til en rik handelsby, og byen fikk en viktig rolle i norsk eksporthistorie. Denne statuen er en hyllest til arbeidet og menneskene bak denne næringen.",
        en: "This statue shows a woman working with clipfish, one of the most important industries in Kristiansund throughout history. Clipfish is dried and salted fish that was exported to countries such as Portugal and Spain.\nWorking with clipfish was hard and required a lot of manual labor. Many women worked laying the fish out to dry on the coastal rocks along the shore.\nClipfish made Kristiansund a wealthy trading town, and the town gained an important role in Norway's export history. This statue is a tribute to the work and the people behind this industry."
      },
      images: [],
      lat: 63.111,
      lng: 7.729,
      locationHint: {
        no: "Grå statue i sentrum av kaia",
        en: "Grey statue in the middle of the docks"
      }
    },
    {
      id: "nordmre-museum",
      order: 3,
      title: {
        no: "Nordmøre Museum",
        en: "Nordmøre Museum"
      },
      description: {
        no: "På Nordmøre Museum kan du oppleve hvordan folk levde langs kysten før i tiden. Museet viser gamle hus, båter og gjenstander fra hverdagslivet i regionen.\nHer får du innsikt i hvordan fiske, handel og sjøliv har formet kulturen i Kristiansund. Livet var nært knyttet til havet, og mange familier levde av det naturen ga.\nMuseet gir deg en dypere forståelse av hvordan byen har utviklet seg gjennom tidene, og hvorfor kystkulturen fortsatt er viktig i dag.",
        en: "At Nordmøre Museum, you can experience how people used to live along the coast. The museum displays old houses, boats, and objects from everyday life in the region.\nHere, you gain insight into how fishing, trade, and maritime life have shaped the culture of Kristiansund. Life was closely tied to the sea, and many families lived off what nature provided.\nThe museum gives you a deeper understanding of how the town has developed over time and why coastal culture is still important today."
      },
      images: [],
      lat: 63.111,
      lng: 7.729,
      locationHint: {
        no: "Nye Normoria bygget",
        en: "The new Normoria building"
      }
    },
    {
      id: "vanndamman",
      order: 4,
      title: {
        no: "Vanndamman",
        en: "Mini lake park"
      },
      description: {
        no: "Vanndamman er et rolig og vakkert område midt i byen. Her finner du små vann, grøntområder og stier som gir en pause fra bylivet.\nOmrådet viser hvordan natur og by er tett knyttet sammen i Kristiansund. Selv i sentrum er naturen alltid nær.\nDette stedet gir deg mulighet til å oppleve stillhet og ro, samtidig som du er midt i en historisk kystby.",
        en: "Vanndamman is a calm and beautiful area in the middle of the town. Here you will find small lakes, green spaces, and paths that offer a break from city life.\nThe area shows how nature and the town are closely connected in Kristiansund. Even in the city center, nature is always nearby.\nThis place gives you the opportunity to experience peace and quiet while still being in the heart of a historic coastal town."
      },
      images: [],
      lat: 63.111,
      lng: 7.729,
      locationHint: {
        no: "Parken ovenfor kirka",
        en: "The park above the church"
      }
    },
    {
      id: "varden-utsiktspunkt",
      order: 5,
      title: {
        no: "Varden utsiktspunkt",
        en: "Varden lockout point"
      },
      description: {
        no: "Fra Varden får du en fantastisk utsikt over hele Kristiansund. Du kan se de ulike øyene som byen er bygget på, og hvordan havet omgir alt.\nUtsikten viser tydelig hvordan geografi har påvirket utviklingen av byen. Øyene, sundene og havet har gjort sjøtransport til en viktig del av livet her.\nDette er et perfekt sted for å ta bilder og virkelig forstå hvordan natur og bosetting henger sammen i Norge.",
        en: "From Varden, you get a fantastic view over all of Kristiansund. You can see the different islands the town is built on and how the sea surrounds everything.\nThe view clearly shows how geography has influenced the town's development. The islands, straits, and sea have made maritime transport an important part of life here.\nThis is a perfect place to take photos and truly understand how nature and settlement are connected in Norway."
      },
      images: [],
      lat: 63.111,
      lng: 7.729,
      locationHint: {
        no: "Det store hvite tårnet",
        en: "The big white tower"
      }
    },
    {
      id: "kirklandet-kirke",
      order: 6,
      title: {
        no: "Kirklandet kirke",
        en: "Kirkelandet Church"
      },
      description: {
        no: "Kirklandet kirke er en moderne kirke som ble bygget etter andre verdenskrig. Den gamle byen ble ødelagt, og mye måtte bygges opp på nytt.\nKirken er kjent for sin spesielle arkitektur og regnes som en av de mest moderne kirkene i Norge.\nDen symboliserer både ødeleggelse og gjenoppbygging, og viser hvordan Kristiansund har reist seg igjen etter krigen.",
        en: "Kirklandet Church is a modern church that was built after the Second World War. The old town was destroyed, and much had to be rebuilt.\nThe church is known for its distinctive architecture and is considered one of the most modern churches in Norway.\nIt symbolizes both destruction and reconstruction, showing how Kristiansund rose again after the war."
      },
      images: [],
      lat: 63.114558,
      lng: 7.725902,
      locationHint: {
        no: "Den store, moderne, hvite kirka",
        en: "The big, modern, white church"
      }
    },
    {
      id: "gripruta-kai",
      order: 7,
      title: {
        no: "Gripruta kai",
        en: "Gripruta Docks"
      },
      description: {
        no: "Herfra går båten til Grip, en liten øy utenfor Kristiansund. Øya var tidligere et viktig fiskevær, men i dag er det kun noen få faste innbyggere igjen.\nGrip gir et unikt innblikk i hvordan livet på små øyer langs norskekysten har vært. Mange levde tett sammen og var avhengige av havet.\nSelv om turen ikke går dit i dag, gir dette stoppet en forståelse av livet utenfor byen og hvordan regionen henger sammen.",
        en: "From here, the boat goes to Grip, a small island outside Kristiansund. The island was once an important fishing village, but today only a few permanent residents remain.\nGrip offers a unique insight into what life has been like on small islands along the Norwegian coast. Many people lived closely together and depended on the sea.\nEven though the tour does not go there today, this stop provides an understanding of life outside the town and how the region is connected."
      },
      images: [],
      lat: 63.111,
      lng: 7.729,
      locationHint: {
        no: "Havna i sentrum",
        en: "The docks in the middle of town"
      }
    }
  ]
};

export default tour;
