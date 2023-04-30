import NeoFetchCommand from './NeoFetchCommand';

describe('NeofetchCommand', () => {
  it('displays system information and React logo ASCII art', () => {
    const command = new NeoFetchCommand();

    const os = 'Linux x86_64';
    const cpu = 4;
    const lang = 'en-US';

    Object.defineProperty(window.navigator, 'platform', {
      value: os,
    });
    Object.defineProperty(window.navigator, 'hardwareConcurrency', {
      value: cpu,
    });
    Object.defineProperty(window.navigator, 'language', {
      value: lang,
    });

    const result = command.execute();

    const expectedResult =
      'ICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAKIOKWiOKWiOKWgOKWiOKWiOKWiCAg4paT4paI4paI4paI4paI4paIIOKWhOKWhOKWhCAgICAgICDiloTilojilojilojilojiloQgIOKWhOKWhOKWhOKWiOKWiOKWiOKWiOKWiOKWkyBPUzogTGludXggeDg2XzY0CuKWk+KWiOKWiCDilpIg4paI4paI4paS4paT4paIICAg4paA4paS4paI4paI4paI4paI4paEICAgIOKWkuKWiOKWiOKWgCDiloDiloggIOKWkyAg4paI4paI4paSIOKWk+KWkiBDUFU6IDQgbG9naWNhbCBwcm9jZXNzb3JzCuKWk+KWiOKWiCDilpHiloTilogg4paS4paS4paI4paI4paIICDilpLilojiloggIOKWgOKWiOKWhCAg4paS4paT4paIICAgIOKWhCDilpIg4paT4paI4paI4paRIOKWkuKWkSBMYW5nOiBlbi1VUwrilpLilojilojiloDiloDilojiloQgIOKWkuKWk+KWiCAg4paE4paR4paI4paI4paE4paE4paE4paE4paI4paIIOKWkuKWk+KWk+KWhCDiloTilojilojilpLilpEg4paT4paI4paI4paTIOKWkSAgQXBwbGljYXRpb246IHNjb3R0LXRlcm0K4paR4paI4paI4paTIOKWkuKWiOKWiOKWkuKWkeKWkuKWiOKWiOKWiOKWiOKWkuKWk+KWiCAgIOKWk+KWiOKWiOKWkuKWkiDilpPilojilojilojiloAg4paRICDilpLilojilojilpIg4paRICBGcmFtZXdvcms6IFJlYWN0CuKWkSDilpLilpMg4paR4paS4paT4paR4paR4paRIOKWkuKWkSDilpHilpLilpIgICDilpPilpLilojilpHilpEg4paR4paSIOKWkiAg4paRICDilpIg4paR4paRICAgIAogIOKWkeKWkiDilpEg4paS4paRIOKWkSDilpEgIOKWkSDilpIgICDilpLilpIg4paRICDilpEgIOKWkiAgICAgICDilpEgICAgIAogIOKWkeKWkSAgIOKWkSAgICDilpEgICAg4paRICAg4paSICAg4paRICAgICAgICAgIOKWkSAgICAgICAKICAg4paRICAgICAgICDilpEgIOKWkSAgICAg4paRICDilpHilpEg4paRICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAg4paRICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgCg==';

    expect(Buffer.from(result).toString('base64')).toEqual(expectedResult);
  });
});
