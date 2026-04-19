--
-- PostgreSQL database dump
--

\restrict cIWY2G1GtUk4DLbFscs6OF1KduUdBYbsqL40vqBEzZ5kiXLfb4ezq8ekp4Q0ESh

-- Dumped from database version 17.8 (a48d9ca)
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

SET SESSION AUTHORIZATION DEFAULT;

ALTER TABLE public.products DISABLE TRIGGER ALL;

INSERT INTO public.products (id, name, "photoUrl", price, "totalStock", "availableStock", "startTime", "endTime", "createdAt", "updatedAt") VALUES ('7a0e35a5-526f-4964-bd5e-7c0aa489d96b', 'Nike Boost 350 V2 ''Slate', 'https://unsplash.com/photos/white-nike-air-force-1-low-NUoPWImmjCU', 350, 10, 10, '2026-04-18 18:10:01.673', '2026-04-20 12:00:00', '2026-04-18 18:10:01.673', '2026-04-18 18:13:31.121') ON CONFLICT DO NOTHING;
INSERT INTO public.products (id, name, "photoUrl", price, "totalStock", "availableStock", "startTime", "endTime", "createdAt", "updatedAt") VALUES ('60c4efe1-29ef-4847-99ab-7d6fd211177b', 'New Stylish Sneakers', 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 160, 3, 3, '2026-04-19 02:47:38.216', '2026-04-20 02:47:00', '2026-04-19 02:47:38.216', '2026-04-19 02:47:38.216') ON CONFLICT DO NOTHING;


ALTER TABLE public.products ENABLE TRIGGER ALL;

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.users DISABLE TRIGGER ALL;

INSERT INTO public.users (id, "userName", "clientId", address, "createdAt", "updatedAt") VALUES ('38110ce8-7481-4a9b-9ee8-700314c0a687', 'StressTester_7', '2cb74b49-2a9a-42e4-8527-65369b940013', NULL, '2026-04-18 18:12:19.277', '2026-04-18 18:12:19.277') ON CONFLICT DO NOTHING;
INSERT INTO public.users (id, "userName", "clientId", address, "createdAt", "updatedAt") VALUES ('606f0bb3-dc0c-401f-ba38-4eef6ddbb166', 'StressTester_217', 'fd672f4e-803a-4bf8-a095-fcea90ecd502', NULL, '2026-04-18 18:12:20.86', '2026-04-18 18:12:20.86') ON CONFLICT DO NOTHING;
INSERT INTO public.users (id, "userName", "clientId", address, "createdAt", "updatedAt") VALUES ('635eebeb-3207-4a3e-a2c8-5d3431c59e22', 'StressTester_290', '3c67b4ec-16e8-4df4-b64b-fddd96e5fb6d', NULL, '2026-04-18 18:12:22.364', '2026-04-18 18:12:22.364') ON CONFLICT DO NOTHING;


ALTER TABLE public.users ENABLE TRIGGER ALL;

--
-- Data for Name: reservations; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.reservations DISABLE TRIGGER ALL;

INSERT INTO public.reservations (id, "userId", "productId", amount, quantity, status, "createdAt", "updatedAt", "expiresAt") VALUES ('63881aa2-ec18-4cb1-a407-d8c6e755cd87', '38110ce8-7481-4a9b-9ee8-700314c0a687', '7a0e35a5-526f-4964-bd5e-7c0aa489d96b', 350, 1, 'EXPIRED', '2026-04-18 18:12:20.109', '2026-04-18 18:13:20.835', '2026-04-18 18:13:20.105') ON CONFLICT DO NOTHING;
INSERT INTO public.reservations (id, "userId", "productId", amount, quantity, status, "createdAt", "updatedAt", "expiresAt") VALUES ('9932230e-4b3d-4c7b-af25-a33e327f2050', '606f0bb3-dc0c-401f-ba38-4eef6ddbb166', '7a0e35a5-526f-4964-bd5e-7c0aa489d96b', 350, 1, 'EXPIRED', '2026-04-18 18:12:21.61', '2026-04-18 18:13:30.866', '2026-04-18 18:13:21.609') ON CONFLICT DO NOTHING;
INSERT INTO public.reservations (id, "userId", "productId", amount, quantity, status, "createdAt", "updatedAt", "expiresAt") VALUES ('cbda3620-6f05-4786-b1c3-3ebedffe0454', '635eebeb-3207-4a3e-a2c8-5d3431c59e22', '7a0e35a5-526f-4964-bd5e-7c0aa489d96b', 350, 1, 'EXPIRED', '2026-04-18 18:12:23.112', '2026-04-18 18:13:31.364', '2026-04-18 18:13:23.112') ON CONFLICT DO NOTHING;


ALTER TABLE public.reservations ENABLE TRIGGER ALL;

--
-- Data for Name: purchases; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.purchases DISABLE TRIGGER ALL;



ALTER TABLE public.purchases ENABLE TRIGGER ALL;

--
-- PostgreSQL database dump complete
--

\unrestrict cIWY2G1GtUk4DLbFscs6OF1KduUdBYbsqL40vqBEzZ5kiXLfb4ezq8ekp4Q0ESh

