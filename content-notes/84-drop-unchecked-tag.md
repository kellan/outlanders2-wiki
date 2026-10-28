## Downloaded challenge levels: no "not checked in play" tag (2026-10-28)

The maintainer asked whether the amber "Starting state not checked in play" tag on downloaded challenge levels was true, and whether it mattered.

- It was true: nobody has opened these 260 levels and compared the starting objects with the game.
- The same is true of the packaged campaign and challenge levels, and they carry no tag. Both are decoded from the same Unity level format by the same code.
- The one level checked (Save the Forests Redux, 268 Dead Trees) matched.
- The Starting conditions section already explains what the counts mean.

So the tag added alarm without adding information. It and the matching sentence on the Original, Redux and Bounty pages are removed. The source line now reads "Decoded from the game’s download cache on <date>, the same way as the levels that ship with the game." The records keep `verification_status: …starting_state_gameplay_unverified` for the research pages.
