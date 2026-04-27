-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.clients (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  surname text NOT NULL,
  phone integer NOT NULL,
  dni integer NOT NULL,
  location text NOT NULL,
  CONSTRAINT clients_pkey PRIMARY KEY (id)
);
CREATE TABLE public.orders (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  product_id bigint,
  total_price bigint,
  client_id double precision,
  quantity bigint,
  product double precision,
  receipt bigint,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  status double precision,
  CONSTRAINT orders_pkey PRIMARY KEY (id)
);
CREATE TABLE public.products (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  price numeric NOT NULL,
  category text NOT NULL,
  image_url text NOT NULL,
  description text,
  CONSTRAINT products_pkey PRIMARY KEY (id)
);
CREATE TABLE public.userAdmin (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text,
  telefono bigint,
  dni bigint,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  surname text,
  CONSTRAINT userAdmin_pkey PRIMARY KEY (id)
);