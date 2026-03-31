import './DataStreamDivider.css'

const STREAM = '01001000 65 6C 6C 6F 20 57 6F 72 6C 64 00FF NEURAL_NETWORK GRADIENT_DESCENT BACKPROP 0x1A2F 01110010 EPOCH_03 LOSS=0.042 ACC=0.97 01001101 INFERENCE MODE:ACTIVE 0xDEAD 01010101 BATCH_SIZE=64 LR=0.001 '

export default function DataStreamDivider({ reverse = false }) {
  return (
    <div className="stream-divider" aria-hidden="true">
      <div className={`stream-track ${reverse ? 'reverse' : ''}`}>
        <span>{STREAM.repeat(4)}</span>
        <span aria-hidden="true">{STREAM.repeat(4)}</span>
      </div>
    </div>
  )
}
