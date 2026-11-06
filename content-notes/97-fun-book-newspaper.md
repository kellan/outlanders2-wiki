## Fun: Book base level and Newspapers (2026-11-06)

The maintainer shared a screenshot of a player's post on the Outlanders community Discord (5 November 2026). The player's name is left out. The post says:
- Books give a base Fun level of 80 when carried by a villager.
- Fun is satisfied at 90.
- A Newspaper grants 25 Fun, but Fun falls by 20 each day.
- So it takes 18 days of reading a Newspaper every day to satisfy Fun, and a challenge needing it needs both.

**Checked against the decoded data:**
- Fun satisfaction threshold: 90. Matches.
- Daily fall (`DailyRequired`): 20. Matches.
- Points per unit (`UnitValue`): 25, and a Newspaper carries 1 Fun unit (plus Community 6). Matches.
- Starting value: 0. So with one Newspaper a day the net gain is +5 a day, and 90 is reached in 18 days. Matches.
- Book gear: stores `Need` = Fun (NeedType 3) with `BaseValueIncrease` 79. The reported 80 fits that being a floor the meter rests at while the Book is carried.
- The code that applies `BaseValueIncrease` is not in the IL2CPP methods: `VillagerBehaviour.GearUp` only copies the gear config, and the need update is compiled job code. So this stays a player report for now.

**Changes**
- Observation `book-fun-base-80`, targeting the Gear page, which now shows its observations.
- Observation `newspaper-fun-18-days`, targeting `mechanics/needs` with `need: Fun`. `seenInPlay` takes a filter, so it shows on the Fun page and not the eating page.
- The Fun page gains a worked example built from the stored values.
- The Gear page's open note now gives the reported reading.
- The INFORMATION-NEEDED gear row now records the report and what is left to check: Ukulele, Canteen and Pendant at 79, and the Coat at 129.

**Follow-up: the strategic point**
The maintainer pointed out what matters: you cannot reach full happiness with Books alone. That is relevant to the 5–6 November Redux challenge "Legally Safe Ape Island", where Books and Newspapers are the only Fun sources.
- Level pages: the "Villager needs" table gains a "What can meet it here" column. It lists the items made by buildable buildings that carry the need's units, the carried gear, the gathering places whose spots give the need, and, for Heat, the Bonfire and Winter Cabin.
- Level pages where the Book is the carried Fun option get a "Books alone will not do it" tip that names the other Fun sources on that map.
- The Book and Newspaper pages each get a one-line tip.
- The Fun page's worked example now leads with "Books alone cannot meet it".

**Second correction: Newspapers alone can do it**
Later Discord posts (6 November 2026, shared by the maintainer):
- Villagers keep reading while they have free time; one read three Newspapers in a day.
- Four villagers in one house with 12 Newspapers and no jobs were full within a day or two.
- Players switch from Books to Newspapers: they are faster to make and need no Trappers' Hut.

The "18 days" only holds at one Newspaper a day, and the earlier "you need both" does not hold when Newspapers are plentiful. Recipes back it up: the Press makes 6 Newspapers from 2 Paper, while the Book Workshop needs 2 Paper plus an Animal Hide for one Book.
- New observation `newspapers-read-several-a-day`; the 18-day observation now notes its assumption.
- The level tip, the Book and Newspaper tips and the Fun worked example now say: Books alone cannot meet Fun, and Newspapers can if there are enough. Three a day is 55 net, under two days from empty.
