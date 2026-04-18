--
-- PostgreSQL database dump
--

\restrict ttYG7dza8sLByqrS9LyUh0vpwHVGbHBMmTyfclNU425FeNGxx27AAJuLvmwhsWa

-- Dumped from database version 14.22
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

INSERT INTO public.products (id, name, "photoUrl", price, "totalStock", "availableStock", "startTime", "endTime", "createdAt", "updatedAt") VALUES ('00e6f025-2b34-48ee-8523-5c7fcc9a1ccf', 'Nike Boost Sneaker', 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 180, 3, 1, '2026-04-18 05:47:30.536', '2026-04-18 08:47:00', '2026-04-18 05:47:30.536', '2026-04-18 06:56:49.609') ON CONFLICT DO NOTHING;
INSERT INTO public.products (id, name, "photoUrl", price, "totalStock", "availableStock", "startTime", "endTime", "createdAt", "updatedAt") VALUES ('27d39965-b6ec-4df8-b618-b087f798013c', 'New Stylish Sneakers', 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 200, 10, 8, '2026-04-18 05:46:37.019', '2026-04-19 05:46:00', '2026-04-18 05:46:37.019', '2026-04-18 06:59:26.832') ON CONFLICT DO NOTHING;


ALTER TABLE public.products ENABLE TRIGGER ALL;

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.users DISABLE TRIGGER ALL;

INSERT INTO public.users (id, "userName", "clientId", address, "createdAt", "updatedAt") VALUES ('ac3bd4c6-ccb9-4fa3-9809-9ac5ba578797', 'ami', 'fdad8765-8813-43f2-b2e6-b0666d687662', NULL, '2026-04-18 05:47:47.292', '2026-04-18 05:47:47.292') ON CONFLICT DO NOTHING;
INSERT INTO public.users (id, "userName", "clientId", address, "createdAt", "updatedAt") VALUES ('55826fd2-24a3-473e-a2eb-a49f903d6423', 'New user', '92ad0637-0458-40c9-9ed8-d99433c05b17', NULL, '2026-04-18 06:07:35.276', '2026-04-18 06:07:35.276') ON CONFLICT DO NOTHING;


ALTER TABLE public.users ENABLE TRIGGER ALL;

--
-- Data for Name: reservations; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.reservations DISABLE TRIGGER ALL;

INSERT INTO public.reservations (id, "userId", "productId", amount, quantity, status, "createdAt", "updatedAt", "expiresAt") VALUES ('d231af26-a4a0-4872-90da-d5c35c980501', 'ac3bd4c6-ccb9-4fa3-9809-9ac5ba578797', '00e6f025-2b34-48ee-8523-5c7fcc9a1ccf', 180, 1, 'COMPLETED', '2026-04-18 05:47:47.312', '2026-04-18 05:47:54.441', '2026-04-18 05:48:47.31') ON CONFLICT DO NOTHING;
INSERT INTO public.reservations (id, "userId", "productId", amount, quantity, status, "createdAt", "updatedAt", "expiresAt") VALUES ('526e02a9-84f2-4581-bf52-1d528e7c6759', 'ac3bd4c6-ccb9-4fa3-9809-9ac5ba578797', '27d39965-b6ec-4df8-b618-b087f798013c', 200, 1, 'EXPIRED', '2026-04-18 05:48:00.508', '2026-04-18 05:49:10.03', '2026-04-18 05:49:00.508') ON CONFLICT DO NOTHING;
INSERT INTO public.reservations (id, "userId", "productId", amount, quantity, status, "createdAt", "updatedAt", "expiresAt") VALUES ('2584182c-7b49-499c-b761-afae891a6c0f', 'ac3bd4c6-ccb9-4fa3-9809-9ac5ba578797', '27d39965-b6ec-4df8-b618-b087f798013c', 200, 1, 'EXPIRED', '2026-04-18 05:49:43.034', '2026-04-18 05:50:50.017', '2026-04-18 05:50:43.033') ON CONFLICT DO NOTHING;
INSERT INTO public.reservations (id, "userId", "productId", amount, quantity, status, "createdAt", "updatedAt", "expiresAt") VALUES ('53a143de-b80f-4c78-9276-27e83fd1083b', 'ac3bd4c6-ccb9-4fa3-9809-9ac5ba578797', '00e6f025-2b34-48ee-8523-5c7fcc9a1ccf', 180, 1, 'EXPIRED', '2026-04-18 06:07:20.6', '2026-04-18 06:08:30.014', '2026-04-18 06:08:20.596') ON CONFLICT DO NOTHING;
INSERT INTO public.reservations (id, "userId", "productId", amount, quantity, status, "createdAt", "updatedAt", "expiresAt") VALUES ('5972f831-388d-4683-97d4-0139ff57d231', '55826fd2-24a3-473e-a2eb-a49f903d6423', '27d39965-b6ec-4df8-b618-b087f798013c', 200, 1, 'EXPIRED', '2026-04-18 06:07:35.281', '2026-04-18 06:08:40.011', '2026-04-18 06:08:35.28') ON CONFLICT DO NOTHING;
INSERT INTO public.reservations (id, "userId", "productId", amount, quantity, status, "createdAt", "updatedAt", "expiresAt") VALUES ('15c433f4-ead2-4f2c-8b3f-6bbe9427ee79', 'ac3bd4c6-ccb9-4fa3-9809-9ac5ba578797', '00e6f025-2b34-48ee-8523-5c7fcc9a1ccf', 180, 1, 'COMPLETED', '2026-04-18 06:56:49.618', '2026-04-18 06:56:55.408', '2026-04-18 06:57:49.613') ON CONFLICT DO NOTHING;
INSERT INTO public.reservations (id, "userId", "productId", amount, quantity, status, "createdAt", "updatedAt", "expiresAt") VALUES ('4350ee44-2838-432f-9242-2012d07f6146', 'ac3bd4c6-ccb9-4fa3-9809-9ac5ba578797', '27d39965-b6ec-4df8-b618-b087f798013c', 200, 1, 'COMPLETED', '2026-04-18 06:58:36.709', '2026-04-18 06:58:38', '2026-04-18 06:59:36.708') ON CONFLICT DO NOTHING;
INSERT INTO public.reservations (id, "userId", "productId", amount, quantity, status, "createdAt", "updatedAt", "expiresAt") VALUES ('d98e26a5-f34a-47ce-b18c-628d16a45ae7', '55826fd2-24a3-473e-a2eb-a49f903d6423', '27d39965-b6ec-4df8-b618-b087f798013c', 200, 1, 'COMPLETED', '2026-04-18 06:59:26.836', '2026-04-18 06:59:36.262', '2026-04-18 07:00:26.835') ON CONFLICT DO NOTHING;


ALTER TABLE public.reservations ENABLE TRIGGER ALL;

--
-- Data for Name: purchases; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.purchases DISABLE TRIGGER ALL;

INSERT INTO public.purchases (id, "userId", "productId", quantity, amount, "reservationId", "createdAt", "updatedAt") VALUES ('33d36813-1383-4b5e-9f10-edbd568055a2', 'ac3bd4c6-ccb9-4fa3-9809-9ac5ba578797', '00e6f025-2b34-48ee-8523-5c7fcc9a1ccf', 1, 180, 'd231af26-a4a0-4872-90da-d5c35c980501', '2026-04-18 05:47:54.434', '2026-04-18 05:47:54.434') ON CONFLICT DO NOTHING;
INSERT INTO public.purchases (id, "userId", "productId", quantity, amount, "reservationId", "createdAt", "updatedAt") VALUES ('897240ef-cc49-4933-9aa0-b494cca840cc', 'ac3bd4c6-ccb9-4fa3-9809-9ac5ba578797', '00e6f025-2b34-48ee-8523-5c7fcc9a1ccf', 1, 180, '15c433f4-ead2-4f2c-8b3f-6bbe9427ee79', '2026-04-18 06:56:55.403', '2026-04-18 06:56:55.403') ON CONFLICT DO NOTHING;
INSERT INTO public.purchases (id, "userId", "productId", quantity, amount, "reservationId", "createdAt", "updatedAt") VALUES ('eed65f65-16f7-410c-8585-3b3715a644d6', 'ac3bd4c6-ccb9-4fa3-9809-9ac5ba578797', '27d39965-b6ec-4df8-b618-b087f798013c', 1, 200, '4350ee44-2838-432f-9242-2012d07f6146', '2026-04-18 06:58:37.996', '2026-04-18 06:58:37.996') ON CONFLICT DO NOTHING;
INSERT INTO public.purchases (id, "userId", "productId", quantity, amount, "reservationId", "createdAt", "updatedAt") VALUES ('a243c8b6-b25f-4aa7-9304-e4e687b24763', '55826fd2-24a3-473e-a2eb-a49f903d6423', '27d39965-b6ec-4df8-b618-b087f798013c', 1, 200, 'd98e26a5-f34a-47ce-b18c-628d16a45ae7', '2026-04-18 06:59:36.257', '2026-04-18 06:59:36.257') ON CONFLICT DO NOTHING;


ALTER TABLE public.purchases ENABLE TRIGGER ALL;

--
-- PostgreSQL database dump complete
--

\unrestrict ttYG7dza8sLByqrS9LyUh0vpwHVGbHBMmTyfclNU425FeNGxx27AAJuLvmwhsWa

