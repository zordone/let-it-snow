# Let it Snow!

Just a fun little script to make it snow on a website, especially on our own.

## Usage

- Open up any of our A1 websites like [H+](https://www.hallmarkplus.com/), preferably in Chrome.
- Open the devtools console (`⎇⌘J`).
- Copy the little loader script below.
- Paste it in the console and press enter.
- As the logged message will tell you too:
  > Make sure you have your headphones on.
  > Close the devtools, then click the snowflake ❄️ button in the menu.
  >
  > Happy Holidays! 🎄

You can stop it by clicking the button again, after it's not yellow anymore (ie: fully started or fully stopped).

Since the extra menu item is just hacked into the menu, it will quickly disappear as soon as you start clicking things, but it will keep snowing. Just reload the app when you had enough.

## Script

This little loader script will just load the main script from this GitHub repo.

```
d=document;s=d.createElement("script");s.src="https://zordone.github.io/let-it-snow/setup.js";d.body.appendChild(s);null;
```

Alternatively, you can also use this encoded version. Less chance of a spoiler, but more chance of tech-savvy people having trust issues.

```
eval(atob('ZD1kb2N1bWVudDtzPWQuY3JlYXRlRWxlbWVudCgic2NyaXB0Iik7cy5zcmM9Imh0dHBzOi8vem9yZG9uZS5naXRodWIuaW8vbGV0LWl0LXNub3cvc2V0dXAuanMiO2QuYm9keS5hcHBlbmRDaGlsZChzKTtudWxsOw=='))
```

## Happy Holidays! 🎄
