// import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import config from '../config';

const ENDPOINT = `${config.API_URL}/project`;
export default socketIOClient(ENDPOINT);
