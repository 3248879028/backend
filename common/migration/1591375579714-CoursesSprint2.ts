import {MigrationInterface, QueryRunner} from "typeorm";

export class CoursesSprint21591375579714 implements MigrationInterface {
    name = 'CoursesSprint21591375579714';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_32d94af473bb59d808d9a68e17b"`, undefined);
        await queryRunner.query(`CREATE TABLE "lecture" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "start" TIMESTAMP NOT NULL, "duration" integer NOT NULL, "instructorId" integer, "subcourseId" integer, CONSTRAINT "PK_2abef7c1e52b7b58a9f905c9643" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "subcourse" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "minGrade" integer NOT NULL, "maxGrade" integer NOT NULL, "maxParticipants" integer NOT NULL, "published" boolean NOT NULL, "cancelled" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_304edeed9f68de88999028fe80e" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "course_tag" ("id" SERIAL NOT NULL, "identifier" character varying NOT NULL, "name" character varying NOT NULL, "category" character varying NOT NULL, CONSTRAINT "PK_6c6a0ad4b5f67db91353e5b2ae1" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_275561ded9309f727f8e795bf1" ON "course_tag" ("identifier") `, undefined);
        await queryRunner.query(`CREATE TABLE "subcourse_instructors_student" ("subcourseId" integer NOT NULL, "studentId" integer NOT NULL, CONSTRAINT "PK_e41756ec54d1828c27b0a5dc055" PRIMARY KEY ("subcourseId", "studentId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_3f0c594b9393bf4ca9ed368196" ON "subcourse_instructors_student" ("subcourseId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_b36e4eeff8040a09cc811dbb26" ON "subcourse_instructors_student" ("studentId") `, undefined);
        await queryRunner.query(`CREATE TABLE "subcourse_participants_pupil" ("subcourseId" integer NOT NULL, "pupilId" integer NOT NULL, CONSTRAINT "PK_7b8738e08eab7b5bf796f0eaf1b" PRIMARY KEY ("subcourseId", "pupilId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_cde91c063947d1302d50c906dc" ON "subcourse_participants_pupil" ("subcourseId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_47d9d98b6496554165e08ff61d" ON "subcourse_participants_pupil" ("pupilId") `, undefined);
        await queryRunner.query(`CREATE TABLE "course_instructors_student" ("courseId" integer NOT NULL, "studentId" integer NOT NULL, CONSTRAINT "PK_aa54b28c5de0010f486dd0d72df" PRIMARY KEY ("courseId", "studentId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_54bce9a9a93ae130beaa70bb2f" ON "course_instructors_student" ("courseId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_66b47860afa3098729925338c1" ON "course_instructors_student" ("studentId") `, undefined);
        await queryRunner.query(`CREATE TABLE "course_tags_course_tag" ("courseId" integer NOT NULL, "courseTagId" integer NOT NULL, CONSTRAINT "PK_3996cf424477234b88a0980fd39" PRIMARY KEY ("courseId", "courseTagId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d6261ad9de1fc5f06946095bf8" ON "course_tags_course_tag" ("courseId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_af4499c3ae1153ac06782b2e5b" ON "course_tags_course_tag" ("courseTagId") `, undefined);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "birthday"`, undefined);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "instructorDescription"`, undefined);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "maxParticipants"`, undefined);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "maxGrade"`, undefined);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "minGrade"`, undefined);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "instructorId"`, undefined);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "frequency"`, undefined);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "duration"`, undefined);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "startDate"`, undefined);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "joinAfterStart"`, undefined);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "categoryId"`, undefined);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "requirements"`, undefined);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "motivation"`, undefined);
        await queryRunner.query(`CREATE TYPE "pupil_schooltype_enum" AS ENUM('grundschule', 'gesamtschule', 'hauptschule', 'realschule', 'gymnasium', 'förderschule', 'other')`, undefined);
        await queryRunner.query(`ALTER TABLE "pupil" ADD "schooltype" "pupil_schooltype_enum" NOT NULL DEFAULT 'other'`, undefined);
        await queryRunner.query(`ALTER TABLE "pupil" ADD "newsletter" boolean NOT NULL DEFAULT false`, undefined);
        await queryRunner.query(`ALTER TABLE "pupil" ADD "isPupil" boolean NOT NULL DEFAULT false`, undefined);
        await queryRunner.query(`ALTER TABLE "pupil" ADD "isParticipant" boolean NOT NULL DEFAULT true`, undefined);
        await queryRunner.query(`ALTER TABLE "student" ADD "newsletter" boolean NOT NULL DEFAULT false`, undefined);
        await queryRunner.query(`CREATE TYPE "student_state_enum" AS ENUM('bw', 'by', 'be', 'bb', 'hb', 'hh', 'he', 'mv', 'ni', 'nw', 'rp', 'sl', 'sn', 'st', 'sh', 'th', 'other')`, undefined);
        await queryRunner.query(`ALTER TABLE "student" ADD "state" "student_state_enum" DEFAULT 'other'`, undefined);
        await queryRunner.query(`ALTER TABLE "student" ADD "university" character varying`, undefined);
        await queryRunner.query(`CREATE TYPE "student_module_enum" AS ENUM('internship', 'seminar')`, undefined);
        await queryRunner.query(`ALTER TABLE "student" ADD "module" "student_module_enum"`, undefined);
        await queryRunner.query(`ALTER TABLE "student" ADD "moduleHours" integer`, undefined);
        await queryRunner.query(`CREATE TYPE "course_category_enum" AS ENUM('revision', 'club', 'coaching')`, undefined);
        await queryRunner.query(`ALTER TABLE "course" ADD "category" "course_category_enum" NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "pupil" ALTER COLUMN "verification" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "pupil" ALTER COLUMN "verifiedAt" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "pupil" ALTER COLUMN "authToken" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "pupil" ALTER COLUMN "authTokenSent" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "pupil" DROP COLUMN "state"`, undefined);
        await queryRunner.query(`CREATE TYPE "pupil_state_enum" AS ENUM('bw', 'by', 'be', 'bb', 'hb', 'hh', 'he', 'mv', 'ni', 'nw', 'rp', 'sl', 'sn', 'st', 'sh', 'th', 'other')`, undefined);
        await queryRunner.query(`ALTER TABLE "pupil" ADD "state" "pupil_state_enum" NOT NULL DEFAULT 'other'`, undefined);
        await queryRunner.query(`ALTER TABLE "pupil" ALTER COLUMN "subjects" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "match" ALTER COLUMN "dissolveReason" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "screener" ALTER COLUMN "verification" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "screener" ALTER COLUMN "verifiedAt" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "screener" ALTER COLUMN "authToken" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "screener" ALTER COLUMN "authTokenSent" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "verification" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "verifiedAt" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "authToken" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "authTokenSent" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "subjects" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "lastSentScreeningInvitationDate" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "lecture" ADD CONSTRAINT "FK_2ca61c8451b53ad2da3c5f6432a" FOREIGN KEY ("instructorId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "lecture" ADD CONSTRAINT "FK_087916363d2c5b483701d505a07" FOREIGN KEY ("subcourseId") REFERENCES "subcourse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "subcourse_instructors_student" ADD CONSTRAINT "FK_3f0c594b9393bf4ca9ed3681967" FOREIGN KEY ("subcourseId") REFERENCES "subcourse"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "subcourse_instructors_student" ADD CONSTRAINT "FK_b36e4eeff8040a09cc811dbb262" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "subcourse_participants_pupil" ADD CONSTRAINT "FK_cde91c063947d1302d50c906dcd" FOREIGN KEY ("subcourseId") REFERENCES "subcourse"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "subcourse_participants_pupil" ADD CONSTRAINT "FK_47d9d98b6496554165e08ff61d9" FOREIGN KEY ("pupilId") REFERENCES "pupil"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "course_instructors_student" ADD CONSTRAINT "FK_54bce9a9a93ae130beaa70bb2fa" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "course_instructors_student" ADD CONSTRAINT "FK_66b47860afa3098729925338c18" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "course_tags_course_tag" ADD CONSTRAINT "FK_d6261ad9de1fc5f06946095bf8c" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "course_tags_course_tag" ADD CONSTRAINT "FK_af4499c3ae1153ac06782b2e5b9" FOREIGN KEY ("courseTagId") REFERENCES "course_tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_tags_course_tag" DROP CONSTRAINT "FK_af4499c3ae1153ac06782b2e5b9"`, undefined);
        await queryRunner.query(`ALTER TABLE "course_tags_course_tag" DROP CONSTRAINT "FK_d6261ad9de1fc5f06946095bf8c"`, undefined);
        await queryRunner.query(`ALTER TABLE "course_instructors_student" DROP CONSTRAINT "FK_66b47860afa3098729925338c18"`, undefined);
        await queryRunner.query(`ALTER TABLE "course_instructors_student" DROP CONSTRAINT "FK_54bce9a9a93ae130beaa70bb2fa"`, undefined);
        await queryRunner.query(`ALTER TABLE "subcourse_participants_pupil" DROP CONSTRAINT "FK_47d9d98b6496554165e08ff61d9"`, undefined);
        await queryRunner.query(`ALTER TABLE "subcourse_participants_pupil" DROP CONSTRAINT "FK_cde91c063947d1302d50c906dcd"`, undefined);
        await queryRunner.query(`ALTER TABLE "subcourse_instructors_student" DROP CONSTRAINT "FK_b36e4eeff8040a09cc811dbb262"`, undefined);
        await queryRunner.query(`ALTER TABLE "subcourse_instructors_student" DROP CONSTRAINT "FK_3f0c594b9393bf4ca9ed3681967"`, undefined);
        await queryRunner.query(`ALTER TABLE "lecture" DROP CONSTRAINT "FK_087916363d2c5b483701d505a07"`, undefined);
        await queryRunner.query(`ALTER TABLE "lecture" DROP CONSTRAINT "FK_2ca61c8451b53ad2da3c5f6432a"`, undefined);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "lastSentScreeningInvitationDate" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "subjects" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "authTokenSent" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "authToken" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "verifiedAt" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "verification" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "screener" ALTER COLUMN "authTokenSent" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "screener" ALTER COLUMN "authToken" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "screener" ALTER COLUMN "verifiedAt" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "screener" ALTER COLUMN "verification" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "match" ALTER COLUMN "dissolveReason" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "pupil" ALTER COLUMN "subjects" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "pupil" DROP COLUMN "state"`, undefined);
        await queryRunner.query(`DROP TYPE "pupil_state_enum"`, undefined);
        await queryRunner.query(`ALTER TABLE "pupil" ADD "state" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "pupil" ALTER COLUMN "authTokenSent" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "pupil" ALTER COLUMN "authToken" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "pupil" ALTER COLUMN "verifiedAt" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "pupil" ALTER COLUMN "verification" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "category"`, undefined);
        await queryRunner.query(`DROP TYPE "course_category_enum"`, undefined);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "moduleHours"`, undefined);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "module"`, undefined);
        await queryRunner.query(`DROP TYPE "student_module_enum"`, undefined);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "university"`, undefined);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "state"`, undefined);
        await queryRunner.query(`DROP TYPE "student_state_enum"`, undefined);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "newsletter"`, undefined);
        await queryRunner.query(`ALTER TABLE "pupil" DROP COLUMN "isParticipant"`, undefined);
        await queryRunner.query(`ALTER TABLE "pupil" DROP COLUMN "isPupil"`, undefined);
        await queryRunner.query(`ALTER TABLE "pupil" DROP COLUMN "newsletter"`, undefined);
        await queryRunner.query(`ALTER TABLE "pupil" DROP COLUMN "schooltype"`, undefined);
        await queryRunner.query(`DROP TYPE "pupil_schooltype_enum"`, undefined);
        await queryRunner.query(`ALTER TABLE "course" ADD "motivation" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "course" ADD "requirements" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "course" ADD "categoryId" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "course" ADD "joinAfterStart" boolean NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "course" ADD "startDate" TIMESTAMP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "course" ADD "duration" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "course" ADD "frequency" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "course" ADD "instructorId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "course" ADD "minGrade" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "course" ADD "maxGrade" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "course" ADD "maxParticipants" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "student" ADD "instructorDescription" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "student" ADD "birthday" date`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_af4499c3ae1153ac06782b2e5b"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_d6261ad9de1fc5f06946095bf8"`, undefined);
        await queryRunner.query(`DROP TABLE "course_tags_course_tag"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_66b47860afa3098729925338c1"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_54bce9a9a93ae130beaa70bb2f"`, undefined);
        await queryRunner.query(`DROP TABLE "course_instructors_student"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_47d9d98b6496554165e08ff61d"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_cde91c063947d1302d50c906dc"`, undefined);
        await queryRunner.query(`DROP TABLE "subcourse_participants_pupil"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_b36e4eeff8040a09cc811dbb26"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_3f0c594b9393bf4ca9ed368196"`, undefined);
        await queryRunner.query(`DROP TABLE "subcourse_instructors_student"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_275561ded9309f727f8e795bf1"`, undefined);
        await queryRunner.query(`DROP TABLE "course_tag"`, undefined);
        await queryRunner.query(`DROP TABLE "subcourse"`, undefined);
        await queryRunner.query(`DROP TABLE "lecture"`, undefined);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_32d94af473bb59d808d9a68e17b" FOREIGN KEY ("instructorId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
