<?php

namespace App\Filament\Resources\Galeris;

use App\Filament\Resources\Galeris\Pages\ManageGaleris;
use App\Models\Galeri;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use UnitEnum;

class GaleriResource extends Resource
{
    protected static ?string $model = Galeri::class;
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedPhoto;
    protected static ?string $recordTitleAttribute = 'Galeri';
    protected static ?string $navigationLabel = 'Galeri';
    protected static ?int $navigationSort = 5;
    protected static UnitEnum|string|null $navigationGroup = 'Manajemen Galeri';
    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('judul'),
                Select::make('kategori_id')
                    ->relationship('kategori', 'nama'),
                FileUpload::make('gambar')
                    ->required()
                    ->image()
                    ->disk('public')
                    ->multiple()
                    ->directory('galeri')
                    ->columnSpanFull(),
                TextInput::make('deskripsi')
                    ->columnSpanFull(),
                
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('judul')
                    ->searchable(),
                ImageColumn::make('gambar')
                    ->disk('public'),
                TextColumn::make('kategori.nama')
                    ->searchable(),
                TextColumn::make('deskripsi')
                    ->searchable(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageGaleris::route('/'),
        ];
    }
}
