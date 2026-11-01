## Challenge rollover confirmed fixed at 18:00 UTC (2026-11-01)

PR 87 switched the site to 18:00 UTC on the assumption that the rollover is fixed in UTC rather than following US Eastern time. The test was the first rollover after the US clocks changed on 1 November 2026.

At 17:47 UTC that day the maintainer reported that the game showed the challenge rolling over in 13 minutes. That is 18:00 UTC, which after the change is 1pm Eastern instead of 2pm, so the rollover is fixed in UTC.

**Changes**
- New observation `challenge-rollover-utc-confirmed` (player report, version 31, 1 November 2026).
- The older 2pm-Eastern observation's note now points to the confirmation instead of leaving the question open.
- The code comment on `liveChallenge` now says the rollover is confirmed.
- No logic change: `challengeToday` already uses 18:00 UTC.
- The Monday reminder to ask about the clock change is cancelled.
