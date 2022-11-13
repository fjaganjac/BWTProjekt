let assert = chai.assert;
describe('PREDMET - TESTIRANJE', function() {
    describe('#provjeriKodPredmeta()', function() {
      it('treba vratiti true za string "RI-BoE-3-2"', function() {
        let P = new Predmet();
        assert.equal(P.provjeriKodPredmeta("RI-BoE-3-2"), true);
      });
      it('treba vratiti false za string "RI-BoE-2" (neispravan broj segmenata)', function() {
        let P = new Predmet();
        assert.equal(P.provjeriKodPredmeta("RI-BoE-2"), false);
      });
      it('treba vratiti false za string "RI-BoE-4-2" (neispravna godina studija)', function() {
        let P = new Predmet();
        assert.equal(P.provjeriKodPredmeta("RI-BoE-4-2"), false);
      });
      it('treba vratiti false za string "ri-BoE-3-2" (neispravan format odsjeka)', function() {
        let P = new Predmet();
        assert.equal(P.provjeriKodPredmeta("ri-BoE-3-2"), false);
      });
      it('treba vratiti false za string "RI-BoE-3-0" (neispravan semestar)', function() {
        let P = new Predmet();
        assert.equal(P.provjeriKodPredmeta("RI-BoE-3-0"), false);
      });
      it('treba vratiti false za string "RI-RS-3-1" (stručni studij nema tri godine)', function() {
        let P = new Predmet();
        assert.equal(P.provjeriKodPredmeta("RI-RS-3-1"), false);
      });
      it('atributu kodPredmeta se dodijeljuje vrijednost nakon uspješne validacije koda', function() {
        let P = new Predmet();
        assert.equal(P.kodPredmeta,"");
        P.provjeriKodPredmeta("RI-BoE-3-2");
        assert.equal(P.kodPredmeta, "RI-BoE-3-2");
      });
      it('atributu kodPredmeta se ne dodijeljuje vrijednost nakon neuspješne validacije koda', function() {
        let P = new Predmet();
        assert.equal(P.kodPredmeta,"");
        P.provjeriKodPredmeta("RI-RS-3-2");
        assert.equal(P.kodPredmeta, "");
      });
  });
  });