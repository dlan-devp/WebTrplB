<?php

namespace App\Filament\Resources\KategoriGaleris\Pages;

use App\Filament\Resources\KategoriGaleris\KategoriGaleriResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

class ManageKategoriGaleris extends ManageRecords
{
    protected static string $resource = KategoriGaleriResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
