let assert = chai.assert;
describe('PRISUSTVO - TESTIRANJE', function() {
  describe('#izracunajPrisustvo()', function() {
    it('parametar sedmica nije validan (u rasponu od 1 do 15)', function() {
      let P = new Prisustvo();
      P.trenutnaSedmica = 17;
      const lista = [{ prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }];
      assert.equal(JSON.stringify(P.izracunajPrisustvo(16, lista)), JSON.stringify({greska: "Parametar sedmica nema vrijednost u rasponu od 1 do 15!"}));
    });
    it('vrijednost parametra sedmica nije cijeli broj', function() {
      let P = new Prisustvo();
      P.trenutnaSedmica = 6;
      const lista = [{ prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }];
      assert.equal(JSON.stringify(P.izracunajPrisustvo(2.5, lista)), JSON.stringify({greska: "Parametar sedmica nema vrijednost u rasponu od 1 do 15!"}));
    });
    it('parametar sedmica ima vrijednost koja je veća od atributa trenutnaSedmica', function() {
      let P = new Prisustvo();
      P.trenutnaSedmica = 2;  
      const lista = [{ prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }];
      assert.equal(JSON.stringify(P.izracunajPrisustvo(3, lista)), JSON.stringify({greska: "Parametar sedmica mora imati vrijednost koja je manja od trenutne sedmice!"}));
    });
    it('objekat u listi nema ispravan format imena atributa prisutan', function() {
      let P = new Prisustvo();
      P.trenutnaSedmica = 7;  
      const lista = [{ prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 2, PRISUTAN: 5, odsutan: 2, nijeUneseno: 0 }];
      assert.equal(JSON.stringify(P.izracunajPrisustvo(2, lista)), JSON.stringify({greska: "Parametar listaPrisustva nema ispravne properties!"}));
      });
    it('zbir vrijednosti atributa prisutan, odsutan i nijeUneseno objekta je veći od 8', function() {
      let P = new Prisustvo();
      P.trenutnaSedmica = 7;  
      const lista = [{ prSedmica: 1, prisutan: 100, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 2 }];
      assert.equal(JSON.stringify(P.izracunajPrisustvo(2, lista)), JSON.stringify({greska: "Parametar listaPrisustva nema ispravnu zbirnu vrijednost!"}));
      });
    it('objekat u listi nema ispravnu vrijednost atributa prisutan', function() {
      let P = new Prisustvo();
      P.trenutnaSedmica = 8;  
      const lista = [{ prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 2, prisutan: -1, odsutan: 2, nijeUneseno: 2 }];
      assert.equal(JSON.stringify(P.izracunajPrisustvo(2, lista)), JSON.stringify({greska: "Parametar listaPrisustva nema ispravne vrijednosti za sedmicu 2 za properties [prisutan]!"}));
      });
    it('objekat u listi nema ispravnu vrijednost atributa prisutan, odsutan i nijeUneseno', function() {
      let P = new Prisustvo();
      P.trenutnaSedmica = 8;  
      const lista = [{ prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 2, prisutan: -1, odsutan: -2, nijeUneseno: -2 }];
      assert.equal(JSON.stringify(P.izracunajPrisustvo(2, lista)), JSON.stringify({greska: "Parametar listaPrisustva nema ispravne vrijednosti za sedmicu 2 za properties [prisutan,odsutan,nijeUneseno]!"}));
      });
    it('dva objekta u listi dijele vrijednost atributa prSedmica, onaj sa neispravnim unosom se nalazi nakon onog sa ispravnim', function() {
      let P = new Prisustvo();
      P.trenutnaSedmica = 8;  
      const lista = [{ prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 2, prisutan: 1, odsutan: 2, nijeUneseno: 2 }, { prSedmica: 1, prisutan: -2, odsutan: -2, nijeUneseno: 1 }];
      assert.equal(JSON.stringify(P.izracunajPrisustvo(2, lista)), JSON.stringify({greska: "Parametar listaPrisustva nema ispravne vrijednosti za sedmicu 1 za properties [prisutan,odsutan]!"}));
      });
    it('dva objekta u listi dijele vrijednost atributa prSedmica, onaj sa neispravnim unosom se nalazi prije onog sa ispravnim', function() {
      let P = new Prisustvo();
      P.trenutnaSedmica = 8;  
      const lista = [{ prSedmica: 1, prisutan: -2, odsutan: -2, nijeUneseno: 1 }, { prSedmica: 2, prisutan: 1, odsutan: 2, nijeUneseno: 2 }, { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }];
      assert.equal(JSON.stringify(P.izracunajPrisustvo(2, lista)), JSON.stringify({prisustvoZaSedmicu: 2, prisutan: 1, odsutan: 2, nijeUneseno: 2}));
      });
    it('više objekata u listi dijele vrijednost atributa prSedmica, samo posljednji ima ispravan unos', function() {
      let P = new Prisustvo();
      P.trenutnaSedmica = 8;  
      const lista = [{ prSedmica: 1, prisutan: -1, odsutan: -1, nijeUneseno: -1 }, { prSedmica: 1, prisutan: -2, odsutan: -2, nijeUneseno: -2 }, { prSedmica: 1, prisutan: 1, odsutan: 2, nijeUneseno: 0 }];
      assert.equal(JSON.stringify(P.izracunajPrisustvo(1, lista)), JSON.stringify({prisustvoZaSedmicu: 1, prisutan: 1, odsutan: 2, nijeUneseno: 0}));
      });
    it('nijedan od objekata ne posjeduje vrijednost parametra sedmica u atributu prSedmica', function() {
      let P = new Prisustvo();
      P.trenutnaSedmica = 8;  
      const lista = [{ prSedmica: 1, prisutan: 0, odsutan: 4, nijeUneseno: 1 }, { prSedmica: 2, prisutan: 1, odsutan: 4, nijeUneseno: 2 }, { prSedmica: 3, prisutan: 3, odsutan: 1, nijeUneseno: 2 }];
      assert.equal(JSON.stringify(P.izracunajPrisustvo(5, lista)), JSON.stringify({prisustvoZaSedmicu: 5, prisutan: -1, odsutan: -1, nijeUneseno: -1}));
      });
    it('parametri su ispravni i metoda vraća objekat sa prisustvom za sedmicu koja je navedena kao parametar sedmica', function() {
      let P = new Prisustvo();
      P.trenutnaSedmica = 8;  
      const lista = [{ prSedmica: 1, prisutan: 0, odsutan: 4, nijeUneseno: 1 }, { prSedmica: 2, prisutan: 1, odsutan: 4, nijeUneseno: 2 }, { prSedmica: 3, prisutan: 3, odsutan: 1, nijeUneseno: 2 }];
      assert.equal(JSON.stringify(P.izracunajPrisustvo(2, lista)), JSON.stringify({prisustvoZaSedmicu: 2, prisutan: 1, odsutan: 4, nijeUneseno: 2}));
      });
    it('metoda ispravno računa vrijednost atributa prisustvo', function() {
      let P = new Prisustvo();
      P.trenutnaSedmica = 8;  
      const lista = [{ prSedmica: 1, prisutan: 0, odsutan: 4, nijeUneseno: 1 }, { prSedmica: 2, prisutan: 1, odsutan: 4, nijeUneseno: 2 }, { prSedmica: 3, prisutan: 3, odsutan: 1, nijeUneseno: 2 }];
      assert.equal(JSON.stringify(P.izracunajPrisustvo(2, lista)), JSON.stringify({prisustvoZaSedmicu: 2, prisutan: 1, odsutan: 4, nijeUneseno: 2}));
      assert.equal(P.prisustvo, 0.31)
      });
    it('nijedan objekat nema vrijednost atributa nijeUneseno veću od nule', function() {
      let P = new Prisustvo();
      P.trenutnaSedmica = 8;  
      assert.equal(P.finalnoStanje, false);
      const lista = [{ prSedmica: 1, prisutan: 0, odsutan: 4, nijeUneseno: 0 }, { prSedmica: 2, prisutan: 1, odsutan: 4, nijeUneseno: 0 }, { prSedmica: 3, prisutan: 3, odsutan: 1, nijeUneseno: 0 }];
      P.izracunajPrisustvo(2, lista);
      assert.equal(P.finalnoStanje, true);
      });
    it('jedan ili više objekata imaju vrijednost atributa nijeUneseno veću od nule', function() {
      let P = new Prisustvo();
      P.trenutnaSedmica = 8;  
      assert.equal(P.finalnoStanje, false);
      const lista = [{ prSedmica: 1, prisutan: 0, odsutan: 4, nijeUneseno: 1 }, { prSedmica: 2, prisutan: 1, odsutan: 4, nijeUneseno: 0 }, { prSedmica: 3, prisutan: 3, odsutan: 1, nijeUneseno: 3 }];
      P.izracunajPrisustvo(2, lista);
      assert.equal(P.finalnoStanje, false);
      });
});

});