import * as bcrypt from 'bcrypt';
import { createConnection, Connection } from 'typeorm';
import { User } from '../../src/app/entities/user.entity';
import { authRequest, PayloadJwt } from '../utils/authRequest';
// tslint:disable-next-line
require('dotenv').config();
const host = `http://localhost:${process.env.APP_PORT}/graphql`;
/**
 * Sample data
 */
