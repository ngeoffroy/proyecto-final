import * as Tone from "tone";

const chordToNoteMap = {
    DO: "C4",
    RE: "D4",
    MI: "E4",
    FA: "F4",
    SOL: "G4",
    LA: "A4",
    SI: "B4",
};

export const handlerStartMusic = async (chord) => {
    const now = Tone.now();
    await Tone.start();

    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const note = chordToNoteMap[chord];

    synth.triggerAttack(note, now);
    synth.triggerRelease([note], now + 0.8);
}