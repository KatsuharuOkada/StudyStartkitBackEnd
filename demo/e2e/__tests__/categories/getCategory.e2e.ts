import { Connection, createConnection, Repository } from 'typeorm';
import { Category } from '../../src/app/entities/category.entity';
import request from 'graphql-request';

require('dotenv').config();
const host = `http://localhost:${process.env.APP_PORT}/graphql`;
