import asyncio
import random
import websockets
import json
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import base64
import io
from libs import ContextManager
import warnings
warnings.filterwarnings('ignore')

class WebSocket:
    def __init__(self, address: str, port: int):
        self.context_manager = ContextManager()

        self.address = address
        self.port = port

        self.received_message = {
            'type': '',
            'data': ''
        }
        self.server_reply = {
            'status': '',
            'type': '',
            'value': ''
        }
        self.req_data_count = 0

        asyncio.get_event_loop().run_until_complete(
            websockets.serve(self.init, self.address, self.port))
        asyncio.get_event_loop().run_forever()

    async def init(self, websocket, path):
        while True:
            self.received_message = await websocket.recv()
            self.received_message = json.loads(self.received_message)
            # reply, tag = context_manager.make_reply(received_message)

            if self.received_message['type'] == 'image_type':
                self.img_type = self.received_message['data'].lower()
                self.req_data_count += 1
            if self.received_message['type'] == 'init':
                await websocket.send(
                    json.dumps(
                        {
                            'status': True,
                            'type': 'status',
                            'value': {
                                'tag': 'System ready',
                                'value': 'True'
                            }
                        },
                        separators=(',', ':')
                    )
                )
                await websocket.send(
                    json.dumps(
                        {
                            'status': True,
                            'type': 'status',
                            'value': {
                                'tag': 'Prediction ready',
                                'value': 'True'
                            }
                        },
                        separators=(',', ':')
                    )
                )
            if self.received_message['type'] == 'image' and len(self.received_message['data']):
                await websocket.send(
                    json.dumps(
                        {
                            'status': True,
                            'type': 'status',
                            'value': {
                                'tag': 'Image acceptance',
                                'value': 'True'
                            }
                        },
                        separators=(',', ':')
                    )
                )

                await asyncio.sleep(random.random() * 3)
                convert_to_bytes = io.BytesIO(
                    base64.b64decode(self.received_message['data']))
                with convert_to_bytes:
                    self.converted_img = mpimg.imread(
                        convert_to_bytes, format='png')

                await websocket.send(
                    json.dumps(
                        {
                            'status': True,
                            'type': 'status',
                            'value': {
                                'tag': 'Image processing completion',
                                'value': 'True'
                            }
                        },
                        separators=(',', ':')
                    )
                )
                self.req_data_count += 1
            if self.req_data_count and self.req_data_count % 2 == 0:
                self.context_manager.set_img(self.converted_img)
                await self.context_manager.predict_image(websocket, self.img_type)

            # self.server_reply = json.dumps(
            #     {
            #         'status': True,
            #         'type': 'results',
            #         'value': {
            #             'tag': 'Image Result',
            #             'value': 'True'
            #         }
            #     },
            #     separators=(',', ':')
            # )
            # await websocket.send(self.server_reply)

            await asyncio.sleep(random.random() * 3)


WebSocket('127.0.0.1', 8080)
