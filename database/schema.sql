-- Generated using `pg_dump website -OCs`
CREATE USER website; -- manually added

--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: website; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE website WITH TEMPLATE = template0;


\connect website

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: current_year_term; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.current_year_term (
    year_id integer,
    term_id integer
);


--
-- Name: events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.events (
    id integer NOT NULL,
    title text,
    start_time timestamp without time zone,
    end_time timestamp without time zone,
    location_id integer,
    year_id integer,
    term_id integer
);


--
-- Name: locations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.locations (
    id integer NOT NULL,
    name text
);


--
-- Name: terms; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.terms (
    id integer NOT NULL,
    description text,
    short_name text
);


--
-- Name: years; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.years (
    id integer NOT NULL,
    description text,
    short_name text
);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);


--
-- Name: terms terms_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.terms
    ADD CONSTRAINT terms_pkey PRIMARY KEY (id);


--
-- Name: years years_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.years
    ADD CONSTRAINT years_pkey PRIMARY KEY (id);


--
-- Name: current_year_term current_year_term_term_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.current_year_term
    ADD CONSTRAINT current_year_term_term_id_fkey FOREIGN KEY (term_id) REFERENCES public.terms(id);


--
-- Name: current_year_term current_year_term_year_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.current_year_term
    ADD CONSTRAINT current_year_term_year_id_fkey FOREIGN KEY (year_id) REFERENCES public.years(id);


--
-- Name: events events_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.locations(id);


--
-- Name: events events_term_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_term_id_fkey FOREIGN KEY (term_id) REFERENCES public.terms(id);


--
-- Name: events events_year_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_year_id_fkey FOREIGN KEY (year_id) REFERENCES public.years(id);


--
-- Name: TABLE current_year_term; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT ON TABLE public.current_year_term TO website;


--
-- Name: TABLE events; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT ON TABLE public.events TO website;


--
-- Name: TABLE locations; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT ON TABLE public.locations TO website;


--
-- Name: TABLE terms; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT ON TABLE public.terms TO website;


--
-- Name: TABLE years; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT ON TABLE public.years TO website;


--
-- PostgreSQL database dump complete
--

