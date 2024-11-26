-- CreateTable
CREATE TABLE "research_field" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "research_field_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "application_research_field" (
    "id" SERIAL NOT NULL,
    "application_id" INTEGER NOT NULL,
    "research_field_id" INTEGER NOT NULL,

    CONSTRAINT "application_research_field_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "research_field_name_key" ON "research_field"("name");

-- AddForeignKey
ALTER TABLE "application_research_field" ADD CONSTRAINT "application_research_field_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_research_field" ADD CONSTRAINT "application_research_field_research_field_id_fkey" FOREIGN KEY ("research_field_id") REFERENCES "research_field"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

INSERT INTO "research_field" ("name") VALUES ('AI + ML'), ('Vision and Graphics'), ('Quantum'), ('Software Engineering'), ('Miscellaneous');
