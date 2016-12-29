/* eslint-disable max-len */
const ConcertRepository = require('./lib/concert-repository.js');

const repo = new ConcertRepository(process.env.MONGODB_URI);

const seeds = [
  {
    date: '2016-11-20',
    textPL: 'Katowice, Międzynarodowy Festiwal Muzyki Kameralnej Kwartet Śląski i jego goście, Partita na skrzypce i fortepian Eugeniusza Knapika, wykonanie z kompozytorem',
    textEN: 'Katowice, International Chamber Music Festival "The Silesian String Quartet and guests", Eugeniusz Knapik - Partita for violin and piano, performance with the composer'
  },
  {
    date: '2016-04-16',
    textPL: 'Warszawa, Polskie Radio, audycja z cyklu "Five o\'clock", recital z Justyną Danczowską',
    textEN: 'Warsaw, Polish Radio, "Five o\'clock" broadcast, recital with Justyna Danczowska'
  },
  {
    date: '2016-03-18',
    textPL: 'Warszawa, Opera Narodowa, recital z cyklu "Preludium premierowe", Sonata Richarda Straussa z Nelsonem Goernerem',
    textEN: 'Warsaw, National Opera, "Premiere preludes: Strauss", recital, Richard Strauss Violin Sonata, Nelson Goerner'
  },
  {
    date: '2016-02-25',
    textPL: 'Pampeluna, Hiszpania, Palacio de Congresos y Auditorio de Navarra, Koncert skrzypcowy M.Karłowicza, dyr. Antoni Wit, Orquesta Sinfónica de Navarra',
    textEN: 'Pamplona, Spain, Palacio de Congresos y Auditorio de Navarra, M. Karłowicz Violin Concerto, maestro Antoni Wit, Orquesta Sinfónica de Navarra'
  },
  {
    date: '2016-02-05',
    textPL: 'Ferrol, Hiszpania, Teatro Jofre de Ferrol, Koncert skrzypcowy M. Karłowicza, dyr. Antoni Wit, ork. Real Filharmonia de Galicia',
    textEN: 'Ferrol, Spain, Teatro Jofre de Ferrol, M. Karłowicz Violin Concerto, maestro Antoni Wit, orchestra Real Filharmonia de Galicia'
  },
  {
    date: '2016-02-04',
    textPL: 'Santiago de Compostela, Hiszpania, Auditorio de Galicia, Koncert skrzypcowy M. Karłowicza, dyr. Antoni Wit, ork. Real Filharmonia de Galicia',
    textEN: 'Santiago de Compostela, Spain, Auditorio de Galicia, M. Karłowicz Violin Concerto, maestro Antoni Wit, orchestra Real Filharmonia de Galicia'
  },
  {
    date: '2015-12-16',
    textPL: 'Wrocław, Narodowe Forum Muzyki, Koncert skrzypcowy Andrzeja Panufnika, dyr. Krzysztof Penderecki, orkiestra Leopoldinum',
    textEN: 'Wrocław, National Forum Of Music, Andrzej Panufnik Violin Concerto, maestro Krzysztof Penderecki, Leopoldinum Chamber Orchestra'
  },
  {
    date: '2015-12-13',
    textPL: 'Kraków, Centrum Kultury Żydowskiej, recital z Marcinem Koziakiem',
    textEN: 'Krakow, Center For Jewish Culture, recital with Marcin Koziak'
  },
  {
    date: '2015-08-15',
    textPL: 'Pieskowa Skała, Koncert skrzypcowy Sofii Gubaiduliny "Offertorium", dyr. Marek Moś, ork. CORda CRACOVIA',
    textEN: 'Pieskowa Skała, Sofia Gubaidulina Violin Concerto "Offertorium", maestro Marek Moś, orchestra CORda CRACOVIA'
  },
  {
    date: '2015-08-19',
    textPL: 'Warszawa, Festiwal Chopin i jego Europa, recital z Marcinem Koziakiem (Paderewski, Wieniawski)',
    textEN: 'Warsaw, Chopin and his Europe Festival, recital with Marcin Koziak (Paderewski, Wieniawski, Debussy)'
  },
  {
    date: '2015-08-15',
    textPL: 'Zamek w Pieskowej Skale, Koncert skrzypcowy Sofii Gubaiduliny, dyr. Marek Moś',
    textEN: 'Pieskowa Skała, Sofia Gubaidulina Violin Concerto, maestro Marek Moś'
  },
  {
    date: '2015-03-21',
    textPL: 'Zakopane, półrecital z Marcinem Koziakiem w willi Atma (Szymanowski, Wieniawski)',
    textEN: 'Zakopane, performance with Marcin Koziak in "Atma" (Wieniawski, Szymanowski)'
  },
  {
    date: '2015-03-18',
    textPL: 'Sochaczew, recital z Justyną Danczowską podczas XV Międzynarodowego Konkursu Skrzypcowego "Janko Muzykant" (Beethoven, Wieniawski, Szymanowski)',
    textEN: 'Sochaczew, recital with Justyna Danczowska during "Janko Muzykant" Violin Competition (Beethoven, Wieniawski, Szymanowski)'
  },
  {
    date: '2015-02-22',
    textPL: 'półrecital z Justyną Danczowską w księgarnii muzycznej Kurant podczas spotkania z Kają Danczowską (Wieniawski, Szymanowski, Bartok, Kreisler)',
    textEN: 'performance with Justyna Danczowska during Kaja Danczowska\'s Anniversary Meeting in Kurant music bookshop (Wieniawski, Szymanowski, Bartok, Kreisler)'
  },
  {
    date: '2015-02-18',
    textPL: 'Katowice, sala kameralna NOSPR, godz 19:30 - recital z Justyną Danczowską (Schubert, Beethoven, Wieniawski, Szymanowski)',
    textEN: 'Katowice, NOSPR chamber hall, 19:30 recital with Justyna Danczowska (Schubert, Beethoven, Wieniawski, Szymanowski)'
  },
  {
    date: '2015-02-18',
    textPL: 'Katowice, sala NOSPR, godz. 12 - Koncert skrzypcowy Jeana Sibeliusa, część trzecia podczas Koncertu Edukacyjnego, orkiestra NOSPR, dyr. Rafał Janiak',
    textEN: 'Katowice, NOSPR concert hall, 12:00, Jean Sibelius Violin Concerto, finale, Educational Concert, conductor: Rafał Janiak, NOSPR Orchestra'
  },
  {
    date: '2015-02-08',
    textPL: 'udział w koncercie w Europejskim Centrum Muzyki K.Pendereckiego w Lusławicach podczas warsztatów Krajowego Funduszu na Rzecz Dzieci (Wieniawski, Bartok)',
    textEN: 'Performance in the K.Penderecki European Centre for Music in Lusławice during the workshops of the Polish Children Fund (Wieniawski, Bartok)'
  },
  {
    date: '2015-01-17',
    textPL: 'recital z Marcinem Koziakiem w Domu Muzyka Seniora w Kątach (Haendel, Beethoven, Wieniawski, Kreisler, Szymanowski)',
    textEN: 'Recital with Marcin Koziak in Kąty near Warsaw (Haendel, Beethoven, Wieniawski, Kreisler, Szymanowski)'
  },
  {
    date: '2014-12-08',
    textPL: 'Krakow, Felix Mendelssohn Violin Concerto E minor, director Yan Pascal Tortelier, the Krakow Academy Symphony Orchestra',
    textEN: 'ICE Krakow Congress Centre, Koncert skrzypcowy e-moll Mendelssohna, dyr. Yan Pascal Tortelier, Orkiestra Symfoniczna Akademii Muzycznej w Krakowie'
  },
  {
    date: '2014-11-29',
    textPL: 'w Chamber Hall of Liszt Ferenc Memorial Museum, w cyklu Matinée Concerts, recital z Miho Morimoto',
    textEN: 'Chamber Hall of Liszt Ferenc Memorial Museum, Matinée Concerts, recital with Miho Morimoto'
  },
  {
    date: '2014-11-28',
    textPL: 'w Concert Hall of Danube Palace w Budapeszcie, Koncert Wieniawskiego d-moll, dyr. András Deák, Danube Symphony Orchestra',
    textEN: 'Concert Hall of Danube Palace, Budapest, Henryk Wieniawski Concerto in D minor, conductor András Deák, Danube Symphony Orchestra'
  },
  {
    date: '2014-11-16',
    textPL: 'recital w Xiqu Theatre w Pekinie',
    textEN: 'recital in Beijing Xiqu Theatre'
  },
  {
    date: '2014-11-14',
    textPL: 'w Forbidden City Concert Hall w Pekinie, Koncert Wieniawskiego d-moll, dyr. Yang Yang, China Philharmonic Orchestra',
    textEN: 'Forbidden City Concert Hall in Beijing, Henryk Wieniawski Concerto in D minor, Yang Yang, China Philharmonic Orchestra'
  },
  {
    date: '2014-10-27',
    textPL: 'w Operze Narodowej w Warszawie, Gala inaugurująca otwarcie Muzeum Historii Żydów Polskich, Koncert skrzypcowy Ignacego Waghaltera, dyr. Andres Mustonen, Orkiestra Sinfonia Varsovia',
    textEN: 'The National Opera Theatre in Warsaw, Open Gala Concert of the Museum of the History of Polish Jews, Ignatz  Waghalter Violin Concerto, conductor Andres Mustonen, Sinfonia Varsovia Orchestra'
  },
  {
    date: '2014-10-24',
    textPL: 'Hagia Eirene Museum w Stambule, Koncert skrzypcowy M.Karłowicza, dyr. Tadeusz Strugała, the Istanbul State Symphony Orchestra',
    textEN: 'Istanbul Hagia Eirene Museum, Mieczyslaw Karlowicz Violin Concerto A major, conductor Tadeusz Strugała, the Istanbul State Symphony Orchestra'
  },
  {
    date: '2014-08-27',
    textPL: 'Na festiwalu Chopin i jego Europa w Warszawie, Koncert skrzypcowy Andrzeja Panufnika, dyr. Jerzy Maksymiuk, Orkiestra Sinfonia Varsovia',
    textEN: ''
  },
  {
    date: '2014-06-24',
    textPL: 'W Operze Narodowej w Warszawie, koncert muzyki Eugeniusza Knapika. Partita w wykonaniu E. Knapika i A. Kuls',
    textEN: ''
  },
  {
    date: '2014-05-16',
    textPL: 'w Filharmonii w Szczecinie, Koncert skrzypcowy H.Wieniawskiego, dyr. Michał Dworzyński, Orkiestra Akademii Beethovenowskiej',
    textEN: 'Philharmonic in Szczecin, H.Wieniawski Violin Concerto, conductor - Michal Dworzynski, Beethoven Academy Orchestra'
  },
  {
    date: '2014-05-14',
    textPL: 'w Filharmonii Pomorskiej w Bydgoszczy, Koncert skrzypcowy W.A.Mozarta G-dur KV.216 oraz Koncert skrzypcowy A.Panufnika, dyr. Jakub Chrenowicz, Orkiestra Kameralna Capella Bydgostiensis',
    textEN: 'Pomorska Philharmonic in Bydgoszcz, W.A.Mozart Violin Concerto KV.216 and A.Panufnik Violin Concerto, conductor - Jakub Chrenowicz, Capella Bydgostiensis Chamber Orchestra'
  },
  {
    date: '2014-02-22',
    textPL: 'w Filharmonii Narodowej w Warszawie, I Koncert Szymanowskiego, dyr. Jacek Kaspszyk, orkiestra FN',
    textEN: 'National Philharmonic - K.Szymanowski - I Violin Concerto, director: Jacek Kaspszyk, Warsaw Philharmonic Symphony Orchestra'
  },
  {
    date: '2014-02-21',
    textPL: 'w Filharmonii Narodowej w Warszawie, I Koncert Szymanowskiego, dyr. Jacek Kaspszyk, orkiestra FN',
    textEN: 'National Philharmonic - K.Szymanowski - I Violin Concerto, director: Jacek Kaspszyk, Warsaw Philharmonic Symphony Orchestra'
  },
  {
    date: '2014-02-07',
    textPL: 'na Zamku Królewskim w Warszawie, udział w koncercie podczas Festiwalu Witolda Lutosławskiego Łańcuch XI, Partita Witolda Lutosławskiego wraz z Eugeniuszem Knapikiem',
    textEN: 'the Royal Castle in Warsaw, a concert during the Witold Lutoslawski Chain festival XI, Partita of Witold Lutoslawski with Eugeniusz Knapik'
  },
  {
    date: '2014-01-16',
    textPL: 'Zakopane, Recital z Marcinem Koziakiem w willi "Atma"',
    textEN: 'Zakopane, Recital with Marcin Koziak in Villa "Atma" (Karol Szymanowski Museum)'
  },
  {
    date: '2014-01-10',
    textPL: 'w Filharmonii Krakowskiej, I Koncert Szymanowskiego, dyr. Antoni Wit, orkiestra FK',
    textEN: 'Cracow Philharmonic - K.Szymanowski - I Violin Concerto, director: Antoni Wit, Cracow Philharmonic Symphony Orchestra'
  },
  {
    date: '2013-11-29',
    textPL: 'w Katowicach, Koncert Podwójny Krzysztofa Pendereckiego, altówka: Ryszard Groblewski, dyr. Krzysztof Penderecki, orkiestra NOSPR',
    textEN: 'Katowice, Poland, Krzysztof Penderecki Concerto Doppio, conductor: Krzysztof Penderecki'
  },
  {
    date: '2013-11-17',
    textPL: 'w Miami na Florydzie, koncert muzyki poskiej z Marcinem Koziakiem',
    textEN: 'Miami Florida, USA, recital with Marcin Koziak'
  },
  {
    date: '2013-11-11',
    textPL: 'w Mediolanie, koncert kameralny z Marcinem Koziakiem',
    textEN: 'Milano, Italy, recital with Marcin Koziak in Auditorium di Milano'
  },
  {
    date: '2013-10-12',
    textPL: 'w Filharmonii Krakowskiej, koncert kwintetu w składzie Aleksandra Kuls, Barbara Mglej, Magdalena Chmielowiec, Aleksandra Lelek, Piotr Kosiński, w programie dwa kwintety fortepianowe: Juliusza Zarębskiego i Sergieja Taniejewa.',
    textEN: 'Cracow Philharmonic - chamber music concert - Aleksandra Kuls, Barbara Mglej, Magdalena Chmielowiec, Aleksandra Lelek, Piotr Kosiński'
  },
  {
    date: '2013-10-04',
    textPL: 'Lublin, Koncert H.Wieniawskiego d-moll, dyr. Wojciech Rodek, Orkiestra Symfoniczna Filharmonii Lubelskiej',
    textEN: 'Lublin, H.Wieniawski Violin Concerto D minor, conductor: Wojciech Rodek, Lublin Philharmonic Symphony Orchestra'
  },
  {
    date: '2013-05-24',
    textPL: 'w Filharmonii Krakowskiej, Koncert Podwójny Krzysztofa Pendereckiego, altówka: Ryszard Groblewski, dyr. Marek Moś, orkiestra FK',
    textEN: ''
  },
  {
    date: '2013-05-18',
    textPL: 'w Bochni, koncert kameralny z Aleksandrą Krawczyk',
    textEN: ''
  },
  {
    date: '2013-05-16',
    textPL: 'w Toruniu, Koncert Podwójny Krzysztofa Pendereckiego, dyr. Krzysztof Penderecki',
    textEN: ''
  },
  {
    date: '2013-05-09',
    textPL: 'w Filharmonii Narodowej w Warszawie, I Koncert skrzypcowy D-dur Prokofiewa, dyr. Wojciech Rodek, Orkiestra Symfoniczna Filharmonii Lubelskiej',
    textEN: 'Warsaw, S. Prokofiev – Violin Concerto D-major, The National Philharmony Orchestra'
  },
  {
    date: '2013-03-15',
    textPL: 'Olsztyn, Koncert Prokofiewa D-dur, Orkiestra Symfoniczna Filharmonii Warmińsko-Mazurskiej, dyrygent: Oleg Zverev',
    textEN: ''
  },
  {
    date: '2013-01-05',
    textPL: 'Wieliczka Koncert Noworoczny w Kopalni Soli, Fundacja Pro Musica Bona',
    textEN: ''
  },
  {
    date: '2012-12-07',
    textPL: 'Opole, M.Karłowicz – Koncert skrzypcowy A-dur',
    textEN: 'Opole, M. Karłowicz – Violin Concerto A-major'
  },
  {
    date: '2012-11-28',
    textPL: 'Warszawa, Koncert muzyki polskiej na jubileuszu Senatu (koncert zamknięty)',
    textEN: ''
  },
  {
    date: '2012-11-26',
    textPL: 'Szombathely, Węgry, recital z Justyną Danczowską',
    textEN: ''
  },
  {
    date: '2012-11-22',
    textPL: 'Kraków, recital w sali Florianka z Justyną Danczowską',
    textEN: ''
  },
  {
    date: '2012-11-21',
    textPL: 'Kraków, recital w Klubie Adwokatów z Justyną Danczowską',
    textEN: ''
  },
  {
    date: '2012-11-18',
    textPL: 'Kraków, Koncert Fundacji Pro Musica Bona, Szkoła im. Żeleńskiego',
    textEN: ''
  },
  {
    date: '2012-10-28',
    textPL: 'Katowice, Akademia Muzyczna, Agencja Silesia, duet z Justyną Danczowską',
    textEN: ''
  },
  {
    date: '2012-10-20',
    textPL: 'Sanok, J.Brahms - Koncert skrzypcowy D-dur, Filharmonia Podkarpacka, dyrygent: Stanisław Krawczyński',
    textEN: 'Sanok, J. Brahms – Violin Concerto D-major, The Podkarpacka Philharmony Orchestra, conductor: Stanisław Krawczyński'
  },
  {
    date: '2012-10-19',
    textPL: 'Rzeszów, J.Brahms – Koncert skrzypcowy D-dur, Filharmonia Podkarpacka. Dyrygent: Stanisław Krawczyński',
    textEN: 'Rzeszów, J. Brahms – Violin Concerto D-major, The Podkarpacka Philharmony Orchestra. Conductor: Stanisław Krawczyński'
  },
  {
    date: '2012-10-12',
    textPL: 'Zielona Góra, H.Wieniawski – Koncert skrzypcowy d-moll',
    textEN: 'Zielona Góra, H. Wieniawski – Concerto for Violin D-minor'
  },
  {
    date: '2012-09-30',
    textPL: 'Kraków, Koncert Bachowski w Kościele św. Marcina.',
    textEN: 'Cracow, The Bach Concert in St. Martin’s Church.'
  },
  {
    date: '2012-09-28',
    textPL: 'Toruń, H.Wieniawski - Koncert skrzypcowy d-moll, Dwór Artusa, Toruńska Orkiestra Symfoniczna, dyrygent: Jerzy Swoboda',
    textEN: 'Toruń, H. Wieniawski – Concerto for Violin D-minor, The Artus’ Court, The Symphonic Orchestra of Toruń, conductor: Jerzy Swoboda'
  },
  {
    date: '2012-02-09',
    textPL: 'Sokołów Podlaski, K.Szymanowski – I Koncert skrzypcowy, Orkiestra Symfoniczna Filharmonii Narodowej, dyrygent: Antoni Wit',
    textEN: 'Sokołów Podlaski, K.Szymanowski – I Violin Concerto, The National Philharmony Symphonic Orchestra, conductor: Antoni Wit'
  },
  {
    date: '2012-08-27',
    textPL: 'Kraków, Festiwal Muzyka w starym Krakowie, recital, duet z Aleksandrą Krawczyk',
    textEN: 'Cracow, the Music in Old Cracow Festival, recital, duet with Aleksandra Krawczyk'
  },
  {
    date: '2012-08-26',
    textPL: 'Warszawa, Festiwal Chopin i jego Europa, H.Wieniawski – Koncert skrzypcowy d-moll, dyrygent: Michał Dworzyński',
    textEN: 'Warsaw, Chopin and his Europe Festival, H. Wieniawski – Concerto for Violin D-minor, conductor: Michał Dworzyński'
  },
  {
    date: '2012-08-20',
    textPL: 'Katowice, Koncert duetów, Agencja artystyczna "Silesia", duet z Aleksandrą Krawczyk',
    textEN: 'Katowice, Duet concert, the Silesia Artistic Agency, duet with Aleksandra Krawczyk'
  },
  {
    date: '2012-08-05',
    textPL: 'Curitiba-Brazylia, H.Wieniawski - Koncert skrzypcowy d-moll, ORQUESTRA SINFÔNICA DO PARANÁ, dyrygent: Antoni Wit.',
    textEN: 'Curitiba-Brasil, H. Wieniawski – Concerto for Violin D-minor, ORQUESTRA SINFÔNICA DO PARANÁ, conductor: Antoni Wit.'
  },
  {
    date: '2012-06-23',
    textPL: 'Warszawa, Letnie Recitale na Grochowskiej, fortepian: Justyna Danczowska',
    textEN: ''
  },
  {
    date: '2012-05-09',
    textPL: 'Warszawa, Filharmonia Narodowa, Koncert Prokofiewa D-dur, Orkiestra Symfoniczną Filharmonii Lubelskiej, dyrygent: Wojciech Rodek',
    textEN: ''
  }
];

const logger = console;

const operations = [];
seeds.forEach((e) => {
  operations.push(repo.add(e));
});

Promise.all(operations).then((values) => {
  logger.log(`ADDED: ${values.length} records`);
  process.exit();
});
