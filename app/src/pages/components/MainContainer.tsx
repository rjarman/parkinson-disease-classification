import React from 'react';
import { SocketEvents } from '../libs/SocketEvents';
import { ParsedData } from '../libs/types';
import './MainContainer.scss';
import * as download from '../../assets/images/download.svg';
import * as add from '../../assets/images/add.svg';
import * as logo from '../../assets/images/logo.png';
import { PdfService } from '../libs/PdfService';
import { IndexEvents } from '../libs/IndexEvents';

export class MainContainer extends React.Component<
  {},
  { parsedData: ParsedData[]; result: string; images: string[] }
> {
  private socketEvents: SocketEvents | undefined;
  private pdfService: PdfService;

  constructor(props: {}) {
    super(props);
    this.state = {
      parsedData: [],
      result: '',
      images: [],
    };
    this.pdfService = new PdfService();
  }

  componentDidMount() {
    this.socketEvents = new SocketEvents(this.messageReceiver.bind(this));
    this.socketEvents.checkServer({ type: 'init', data: 200 });
  }

  downloadPDF() {
    this.pdfService.generatePDF({
      result: this.state.result,
      images: this.state.images,
    });
  }

  private messageReceiver(parsedData: ParsedData) {
    const _ = this.state.parsedData;
    _.push(parsedData);
    this.setState({ parsedData: _ });
    if (parsedData.type === 'results')
      this.setState({ result: parsedData.value.value });
    if (parsedData.type === 'ImageFile')
      this.setState({ images: parsedData.value });
  }

  private imageInput(event: any) {
    const file = event.target.files[0];
    var reader = new FileReader();
    reader.addEventListener('load', (_event: any) => {
      Array.from(
        document.getElementsByClassName(
          'preview-properties'
        ) as HTMLCollectionOf<HTMLElement>
      )[0].style.backgroundImage = `url('${_event.target.result}')`;
      this.socketEvents?.sendToServer({
        type: 'image',
        data: _event.target.result.replace(/.*base64,/, ''),
      });
    });
    reader.readAsDataURL(file);
  }

  private radioBtn(event: any) {
    this.socketEvents?.sendToServer({
      type: 'image_type',
      data: event.target.value,
    });
  }

  componentWillUnmount() {
    this.socketEvents?.disconnect();
  }

  render() {
    const acceptedType = '.png, .PNG, .jpg, .JPG, .JPEG, .jpeg';
    return (
      <div className="test-container">
        <div className="preview-img preview-properties">
          {/* <span id="previewText">
            Select images to preview
          </span> */}
        </div>
        <div className="main-container">
          <div className="card-container">
            <div className="card-1">
              <label htmlFor="img-input">Please insert an image</label>
              <input
                type="file"
                id="img-input"
                accept={acceptedType}
                onChange={this.imageInput.bind(this)}
              />
            </div>
            <div className="card-2">
              <label htmlFor="img-type">Select image type</label>

              <div>
                <input
                  type="radio"
                  id="wave_type"
                  name="img-type"
                  value="Wave"
                  onChange={this.radioBtn.bind(this)}
                />
                <label htmlFor="wave_type">Wave</label>
                <input
                  type="radio"
                  id="spiral_type"
                  name="img-type"
                  value="Spiral"
                  onChange={this.radioBtn.bind(this)}
                />
                <label htmlFor="spiral_type">Spiral</label>
              </div>
            </div>
            <div className="card-3">
              <label>Status</label>
              {this.state.parsedData.length
                ? this.state.parsedData.map((data) => {
                    if (data.type === 'status')
                      return (
                        <p key={data.value.tag} className="status-field">
                          {data.value.tag}:{' '}
                          <span className={data.status ? 'success' : 'error'}>
                            {data.value.value}
                          </span>
                        </p>
                      );
                  })
                : ''}
            </div>
            <div className="card-4">
              <label>Results</label>
              {this.state.parsedData.length
                ? this.state.parsedData.map((data) => {
                    if (data.type === 'results')
                      return (
                        <p key={data.value.tag} className="result-field">
                          The handwriting is highly likely of a{' '}
                          <span className={data.status ? 'success' : 'error'}>
                            {data.value.value}
                          </span>{' '}
                          person!
                        </p>
                      );
                  })
                : ''}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
