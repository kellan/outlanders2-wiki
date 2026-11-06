## Two player tips, checked (2026-11-06)

Both come from Discord posts the maintainer passed on. Players are not named.

**Children cannot drink Wheatshine.** A player recycled the Winter Cabins so villagers would drink more Wheatshine, and the children died.
- Data: Wheatshine's consumption limits are `ConsumedByChildren` false and `ConsumedByAdults` true, with Heat 4 and Fun 4.
- Heat is the only need with a death value: −50, cause Cold.
- Heat sources for children: the Winter Cabin (4 heated sleeping spots), the Bonfire (8 heated social spots) and the Coat. The Coat has `AdultsOnly` false, and its gear floor is −50 + 129 = 79 (research docs/NEEDS.md), so a child in a Coat cannot freeze.
- The maintainer's framing: Wheatshine is not enough for Heat on levels with children.
- Change: a warning paragraph on the climate page (Keeping warm), the Wheatshine page and the Winter Cabin page. Level pages where Heat is on and Wheatshine can be made also get a warning, naming that map's other Heat sources (Coat, Winter Cabin, Bonfire), or saying there are none.

**Fake build sites move materials.** A player brought ten Planks to where they were needed with fake plazas.
- Code: `RecyclableBehaviour.GetRecycleValue` returns the build site's pile counts (everything delivered) for an unfinished site, rather than 60% of the cost. The returned items are placed at the site's position in `RecycleSiteBehaviour.OnWorkspotComplete`.
- Play: the Basic House playtest already showed the full return for a half-built site.
- Change: a "Fake build sites" subsection under Fake recycling on the Recycling page.

Each tip is recorded as an observation with its check. Check 99.
